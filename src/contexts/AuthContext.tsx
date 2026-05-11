/* =========================================================
   Auth Context - RBAC Authentication
   Manages user authentication state and provides auth methods
   ========================================================= */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// User type definition
export interface User {
    id: string;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'MRF';
    studentId?: string;
    course?: string;
    section?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    signin: (username: string, password: string) => Promise<{ success: boolean; user?: User; message?: string }>;
    signout: () => void;
    clearError: () => void;
    refreshUser: () => Promise<User | null>;
    isStudent: boolean;
    isTeacher: boolean;
    isAdmin: boolean;
    isMRF: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Role to route mapping
const ROLE_ROUTES: Record<string, string> = {
    STUDENT: '/student',
    TEACHER: '/teacher',
    ADMIN: '/admin',
    MRF: '/mrf'
};

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Check for existing token on mount
    useEffect(() => {
        const checkAuth = async (): Promise<void> => {
            try {
                const token = api.getToken();
                console.log('🔐 Checking auth on mount, token exists:', !!token);

                if (token) {
                    const response = await api.getMe();
                    if (response.success) {
                        console.log('✅ Auth restored for user:', response.data.user.username);
                        setUser(response.data.user);
                    } else {
                        console.warn('⚠️ Token invalid, clearing');
                        api.removeToken();
                    }
                } else {
                    console.log('ℹ️ No token found, user not authenticated');
                }
            } catch (err) {
                console.error('❌ Auth check failed:', (err as Error).message);
                api.removeToken();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const signin = useCallback(async (username: string, password: string): Promise<{ success: boolean; user?: User; message?: string }> => {
        setError(null);
        setLoading(true);

        try {
            console.log('🔐 Signing in user:', username);
            const response = await api.signin(username, password);

            if (response.success) {
                console.log('✅ Sign in successful for:', response.data.user.username, 'Role:', response.data.user.role);
                setUser(response.data.user);

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
            const message = (err as Error).message || 'Sign in failed';
            console.error('❌ Sign in error:', message);
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const signout = useCallback((): void => {
        api.signout();
        setUser(null);
        navigate('/');
    }, [navigate]);

    const clearError = useCallback((): void => {
        setError(null);
    }, []);

    const refreshUser = useCallback(async (): Promise<User | null> => {
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

    const value: AuthContextType = {
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

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
