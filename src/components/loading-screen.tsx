'use client';

import { motion } from 'framer-motion';
import { Leaf, Utensils, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoadingScreenProps {
  userName?: string;
}

export function LoadingScreen({ userName }: LoadingScreenProps) {
  const firstName = userName?.split(' ')[0] || 'Usuario';

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-64 h-64 bg-gradient-to-br from-green-200/40 to-emerald-200/40 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl"
          animate={{ 
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div
          className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/40 mb-6 relative"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Leaf className="w-12 h-12 text-white" strokeWidth={1.5} />
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-3xl blur-xl"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Hola, {firstName}!
          </h1>
          <p className="text-gray-500 text-sm">
            Preparando tu experiencia personalizada...
          </p>
        </motion.div>

        {/* Loading steps */}
        <motion.div
          className="mt-10 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <LoadingStep
            icon={Shield}
            text="Configurando tus restricciones"
            delay={0}
          />
          <LoadingStep
            icon={Utensils}
            text="Preparando sugerencias"
            delay={0.3}
          />
          <LoadingStep
            icon={Sparkles}
            text="Personalizando tu dieta"
            delay={0.6}
          />
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="mt-10 w-full bg-gray-100 rounded-full h-2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Cargando tu perfil...
        </motion.p>
      </motion.div>
    </div>
  );
}

function LoadingStep({ 
  icon: Icon, 
  text, 
  delay 
}: { 
  icon: React.ElementType; 
  text: string; 
  delay: number 
}) {
  return (
    <motion.div
      className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + delay, duration: 0.5 }}
    >
      <motion.div
        className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          delay: 1 + delay, 
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 1.5
        }}
      >
        <Icon className="w-5 h-5 text-green-600" />
      </motion.div>
      <span className="text-gray-700 text-sm font-medium flex-1">{text}</span>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 + delay, type: 'spring' }}
      >
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      </motion.div>
    </motion.div>
  );
}
