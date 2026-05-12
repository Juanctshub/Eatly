
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share, PlusSquare, X, Smartphone, ArrowUp } from 'lucide-react';

export default function InstallPwaPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if it's an iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    // Check if it's NOT already in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    
    // Check if user has already dismissed it this session
    const hasBeenDismissed = sessionStorage.getItem('pwa_prompt_dismissed');

    if (isIOS && !isStandalone && !hasBeenDismissed) {
      // Show after a small delay for a better feeling
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissPrompt = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-6 right-6 z-[200]"
        >
          <div className="bg-[#1a1a1c]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
            {/* Glossy overlay */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            
            <button 
              onClick={(e) => { e.stopPropagation(); dismissPrompt(); }}
              className="absolute top-3 right-3 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10 cursor-pointer"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
                <PlusSquare className="w-6 h-6 text-green-400" />
              </div>
              
              <div className="flex-1 pr-6">
                <h4 className="text-white font-bold text-sm mb-1">¡Instala Eatly en tu iPhone!</h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  Para tener la experiencia completa sin barras de navegador:
                </p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-white/80 font-medium">
                    <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center">1</div>
                    Toca el botón <Share className="w-3.5 h-3.5 text-blue-400 inline" /> abajo (Compartir)
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/80 font-medium">
                    <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center">2</div>
                    Selecciona <span className="text-green-400">"Añadir a Inicio"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="flex items-center gap-1 text-[10px] text-white/30 font-bold uppercase tracking-widest animate-bounce">
                <ArrowUp className="w-3 h-3" /> desliza hacia arriba
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
