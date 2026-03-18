'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export function SplashScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-green-50 via-white to-emerald-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(16, 185, 129, 0.12)'
              }, transparent 70%)`,
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: `${10 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with animations */}
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.1 
          }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-[2.5rem] blur-2xl opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Logo container */}
          <motion.div
            className="relative w-28 h-28 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-green-500/50"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-transparent via-white/20 to-white/30" />
            
            {/* Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Leaf className="w-14 h-14 text-white" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* App name */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            Eatly
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-3 text-gray-500 text-base font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Tu asistente de alimentación segura
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          className="flex items-center gap-1.5 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="mt-4 text-xs text-gray-400 font-medium tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Cargando...
        </motion.p>
      </div>

      {/* Bottom decorations */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>
    </motion.div>
  );
}
