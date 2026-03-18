'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

function OfflineBlocker() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Sin Conexión</h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Eatly requiere conexión a internet para funcionar, especialmente para nuestra Inteligencia Artificial. Por favor, revisa tu conexión.
        </p>
        <button 
          onClick={() => {
            if (navigator.onLine) setIsOnline(true);
          }}
          className="w-full bg-white text-black py-4 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95"
        >
          Reintentar
        </button>
      </div>
    </motion.div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <OfflineBlocker />
      {children}
    </AnimatePresence>
  );
}
