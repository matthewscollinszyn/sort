/* =========================================================
   Auth Context - RBAC Authentication
   Manages user authentication state and provides auth methods
   ========================================================= */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import realtimeEvents from '../lib/realtimeEvents';

const AuthContext = createContext(null);

// Role to route mapping
const ROLE_ROUTES = {
    STUDENT: '/student',
    TEACHER: '/teacher',
    ADMIN: '/admin',
    MRF: '/mrf'
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check for existing token on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = api.getToken();
                console.log('🔐 Checking auth on mount, token exists:', !!token);

                if (token) {
                    const response = await api.getMe();
                    if (response.success) {
                        console.log('✅ Auth restored for user:', response.data.user.username);
                        setUser(response.data.user);
                        realtimeEvents.connect();
                    } else {
                        console.warn('⚠️ Token invalid, clearing');
                        api.removeToken();
                    }
                } else {
                    console.log('ℹ️ No token found, user not authenticated');
                }
            } catch (err) {
                console.error('❌ Auth check failed:', err.message);
                // Only remove token on explicit auth failures (401), not network errors
                if (err.message?.includes('401') || err.message?.includes('Invalid token') || err.message?.includes('Token expired') || err.message?.includes('No token')) {
                    api.removeToken();
                }
                // On network error, keep the token so user stays logged in when server recovers
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const signin = useCallback(async (username, password) => {
        setError(null);
        setLoading(true);

        try {
            console.log('🔐 Signing in user:', username);
            const response = await api.signin(username, password);

            if (response.success) {
                console.log('✅ Sign in successful for:', response.data.user.username, 'Role:', response.data.user.role);
                setUser(response.data.user);
                realtimeEvents.connect();

                // Navigate based on role
                const redirectPath = ROLE_ROUTES[response.data.user.role] || '/';
                navigate(redirectPath);

                return { success: true, user: response.data.user };
            } else {
                console.warn('⚠️ Sign in failed:', response.message);
                setError(response.message);
                return { success: false, message: response.message };
            }
        } catch (err) {
            const message = err.message || 'Sign in failed';
            console.error('❌ Sign in error:', message);
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const signout = useCallback(() => {
        const userRole = user?.role;
        realtimeEvents.disconnect();
        api.signout();
        setUser(null);
        
        if (userRole === 'ADMIN') {
            navigate('/admin/signin');
        } else if (userRole === 'MRF') {
            navigate('/mrf/signin');
        } else {
            navigate('/');
        }
    }, [navigate, user]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const refreshUser = useCallback(async () => {
        const token = api.getToken();
        if (token) {
            try {
                const response = await api.getMe();
                if (response.success) {
                    setUser(response.data.user);
                    return response.data.user;
                }
            } catch (err) {
                console.error('Failed to refresh user:', err);
            }
        }
        return null;
    }, []);

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        signin,
        signout,
        clearError,
        refreshUser,
        // Role helpers
        isStudent: user?.role === 'STUDENT',
        isTeacher: user?.role === 'TEACHER',
        isAdmin: user?.role === 'ADMIN',
        isMRF: user?.role === 'MRF',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
