/* =========================================================
   EcoLedger – Admin Sign In Page
   Dedicated authentication page for administrators
   ========================================================= */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, User, Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminSignIn() {
    const navigate = useNavigate();
    const { signin } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signin(username, password);

            if (result.success) {
                // Check if user is actually an admin
                if (result.user.role !== 'ADMIN') {
                    setError('Access denied. This portal is for administrators only.');
                    setLoading(false);
                    return;
                }
                // Navigation is handled by AuthContext
            } else {
                setError(result.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred during sign in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 1 }}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px',
                    }}
                />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    transition={{ duration: 1.5 }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
                />
            </div>

            {/* Sign in card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-200">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.6 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 mb-4"
                        >
                            <Shield className="h-8 w-8" />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Administrator Portal
                        </h1>
                        <p className="text-sm text-slate-600">
                            Sign in to access the admin dashboard
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2"
                        >
                            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{error}</p>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Enter your username"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <Shield className="h-5 w-5" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full text-sm text-slate-600 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Leaf className="h-4 w-4" />
                            Back to Main Portal
                        </button>
                    </div>
                </div>

                {/* Security notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-center text-sm text-slate-300"
                >
                    <p className="flex items-center justify-center gap-1">
                        <Lock className="h-3.5 w-3.5" />
                        Secure administrator access only
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
