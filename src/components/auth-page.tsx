'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthPageProps {
  onAuthSuccess: (userData: any) => void;
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    setError('');
    
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Ingresa un email válido');
      return false;
    }
    
    if (!formData.password || formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    
    if (!isLogin && !formData.name.trim()) {
      setError('El nombre es requerido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          name: formData.name.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la solicitud');
      }

      setSuccess(isLogin ? '¡Inicio de sesión exitoso!' : '¡Cuenta creada exitosamente!');
      
      // Give the user a moment to see the success message
      setTimeout(() => {
        onAuthSuccess(data.user);
      }, 800);

    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || resetPassword.length < 6) {
      setError('Ingresa un email válido y una contraseña de al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, newPassword: resetPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setSuccess('Contraseña actualizada correctamente');
      setShowResetModal(false);
      setIsLogin(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50 flex flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-green-200/40 to-emerald-200/40 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2], 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 pt-16 pb-6 px-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/40 mb-5 relative"
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Leaf className="w-10 h-10 text-white" strokeWidth={1.5} />
          <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl opacity-50" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Eatly</h1>
        <p className="text-gray-500 mt-1.5 text-sm">Tu alimentación segura empieza aquí</p>
      </motion.div>

      {/* Auth Card */}
      <motion.div
        className="relative z-10 flex-1 px-5 pb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100/50 overflow-hidden"
          variants={itemVariants}
        >
          {/* Tab Switcher */}
          <div className="flex p-1.5 bg-gray-50/80 m-3 rounded-2xl">
            <motion.button
              type="button"
              onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              Iniciar Sesión
            </motion.button>
            <motion.button
              type="button"
              onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              Registrarse
            </motion.button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium text-gray-700">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white transition-all outline-none text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white transition-all outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <label className="text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:bg-white transition-all outline-none text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-400">Mínimo 6 caracteres</p>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-green-600 text-sm">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {isLogin && (
              <motion.div className="text-right" variants={itemVariants}>
                <button 
                  type="button" 
                  onClick={() => setShowResetModal(true)}
                  className="text-sm text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-green-500/40 transition-all disabled:opacity-70 active:scale-[0.98]"
              variants={itemVariants}
              whileHover={{ scale: isLoading ? 1 : 1.01 }}
              whileTap={{ scale: isLoading ? 1 : 0.99 }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Features */}
          <motion.div
            className="px-5 pb-5 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Sugerencias personalizadas con IA</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Control de alergias e intolerancias</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>100% privado y seguro</span>
            </div>
          </motion.div>

          {/* Terms */}
          <motion.div
            className="px-5 pb-5 text-center border-t border-gray-100 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-gray-400 leading-relaxed">
              Al continuar, aceptas nuestros{' '}
              <button type="button" className="text-green-600 hover:underline">Términos de Servicio</button>
              {' '}y{' '}
              <button type="button" className="text-green-600 hover:underline">Política de Privacidad</button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Reset Password Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl space-y-6"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Restablecer Clave</h2>
                <p className="text-gray-500 text-sm mt-2">Dinos tu email y la nueva clave para tu cuenta</p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email asociado</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nueva contraseña</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    placeholder="Nueva clave"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-green-500 rounded-2xl outline-none transition-all"
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-[2] py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-500/30"
                  >
                    {isLoading ? 'Cambiando...' : 'Actualizar clave'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
