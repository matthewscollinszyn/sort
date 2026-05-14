/* =========================================================
   EcoLedger – MRF Staff Sign In Page
   Modern, responsive authentication for facility staff
   ========================================================= */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Truck, Lock, User, Leaf, Eye, EyeOff, 
    AlertCircle, Recycle, ChevronRight, ShieldCheck,
    ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function MRFSignIn() {
    const navigate = useNavigate();
    const { signin, user, loading } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signInLoading, setSignInLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirection if already logged in as MRF Staff
    useEffect(() => {
        if (!loading && user) {
            if (user.role === 'MRF') {
                navigate('/mrf');
            }
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSignInLoading(true);

        try {
            const result = await signin(username, password);

            if (result.success) {
                if (result.user.role !== 'MRF') {
                    setError('Access denied. This portal is for MRF staff only.');
                    setSignInLoading(false);
                    return;
                }
            } else {
                setError(result.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred during sign in');
        } finally {
            setSignInLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans text-slate-900">
            {/* Left Column: Branding & Info (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600 mix-blend-multiply" />
                    <img 
                        src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=2070" 
                        alt="Recycling Facility"
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-emerald-500/20"
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem] rounded-full border border-blue-500/10"
                    />
                </div>

                <div className="relative z-10 w-full flex flex-col justify-between p-12 text-white">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white">
                            <Leaf className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">EcoLedger</span>
                    </div>

                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                                Staff Portal
                            </span>
                            <h1 className="text-5xl font-bold leading-tight mb-6">
                                Efficient waste <br />
                                <span className="text-emerald-400">recovery</span> management.
                            </h1>
                            <p className="text-lg text-slate-300 max-w-md mb-8">
                                Secure access for Materials Recovery Facility staff to track, process, and report campus-wide waste collections.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6 max-w-lg">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <Truck className="h-6 w-6 text-emerald-400 mb-3" />
                                <h3 className="font-semibold text-white mb-1">Real-time Tasks</h3>
                                <p className="text-xs text-slate-400">Receive collection alerts instantly across campus.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <ShieldCheck className="h-6 w-6 text-blue-400 mb-3" />
                                <h3 className="font-semibold text-white mb-1">Verified Input</h3>
                                <p className="text-xs text-slate-400">Accurate weight recording and asset verification.</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-400">
                        © 2026 EcoLedger &middot; Sustainable Campus Operations
                    </p>
                </div>
            </div>

            {/* Right Column: Sign In Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Header (Visible only on mobile) */}
                    <div className="lg:hidden flex flex-col items-center mb-10">
                        <div className="h-16 w-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 text-white mb-4">
                            <Truck className="h-9 w-9" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">MRF Staff Portal</h2>
                        <p className="text-slate-500 mt-2">Sign in to manage collections</p>
                    </div>

                    {/* Desktop/Tablet Header Text */}
                    <div className="hidden lg:block mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
                        <p className="text-slate-500 mt-2">Enter your credentials to access the facility dashboard.</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3"
                            >
                                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700 font-medium">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                                    Staff Username
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                        placeholder="Enter your staff ID"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button type="button" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={signInLoading || loading}
                                className="w-full relative overflow-hidden bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                <span className={`flex items-center justify-center gap-2 transition-all ${signInLoading ? 'opacity-0' : 'opacity-100'}`}>
                                    Access Dashboard
                                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                {signInLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="h-6 w-6 border-3 border-white/20 border-t-white rounded-full"
                                        />
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-10 flex flex-col items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Campus Landing
                        </button>
                        
                        <div className="h-1 w-12 rounded-full bg-slate-200" />
                        
                        <p className="text-xs text-slate-400 text-center max-w-[15rem]">
                            Authorized access only. All activity is logged and monitored for security.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
