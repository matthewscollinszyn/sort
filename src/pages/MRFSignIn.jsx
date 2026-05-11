/* =========================================================
   EcoLedger – MRF Staff Sign In Page
   Dedicated authentication page for MRF staff
   ========================================================= */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Lock, User, Leaf, Eye, EyeOff, AlertCircle, Recycle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MRFSignIn() {
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
                // Check if user is actually MRF staff
                if (result.user.role !== 'MRF') {
                    setError('Access denied. This portal is for MRF staff only.');
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
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-4">
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
                    className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
                />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"
                />

                {/* Floating icons */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-20 left-20 opacity-10"
                >
                    <Recycle className="h-16 w-16 text-white" />
                </motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-32 right-32 opacity-10"
                >
                    <Truck className="h-20 w-20 text-white" />
                </motion.div>
            </div>

            {/* Sign in card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md z-10"
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.6 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 mb-4"
                        >
                            <Truck className="h-8 w-8" />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            MRF Staff Portal
                        </h1>
                        <p className="text-sm text-slate-600">
                            Materials Recovery Facility Access
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                        >
                            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{error}</p>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Staff ID / Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your staff ID"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Back to landing */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>

                    {/* Info note */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <p className="text-xs text-blue-700 text-center">
                            For MRF staff access only. Contact your supervisor if you need credentials.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
