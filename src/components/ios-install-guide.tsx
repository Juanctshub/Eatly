'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Share, PlusSquare, Smartphone, X, ChevronRight, Apple } from 'lucide-react';
import { useState, useEffect } from 'react';

interface iOSInstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function iOSInstallGuide({ isOpen, onClose }: iOSInstallGuideProps) {
  const [step, setStep] = useState(1);

  // Auto-reset step when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
      }, 500);
    }
  }, [isOpen]);

  const steps = [
    {
      title: "Usa Safari",
      description: "Para instalar apps web en iPhone, debes usar el navegador Safari.",
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Botón Compartir",
      description: "Toca el icono de compartir en la barra inferior de tu pantalla.",
      icon: <Share className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Añadir a Inicio",
      description: "Desliza hacia abajo y elige 'Añadir a la pantalla de inicio'.",
      icon: <PlusSquare className="w-8 h-8 text-green-500" />,
    }
  ];

  const handleShortcutClick = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-[3rem] z-[9999] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />

            <div className="flex-1 overflow-y-auto px-8 pb-10">
              <div className="flex justify-between items-center mt-6 mb-8">
                <div className="flex items-center gap-3">
                  <Apple className="w-6 h-6 text-gray-900" />
                  <h2 className="text-2xl font-bold text-gray-900">Instalar Eatly</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Dots */}
              <div className="flex gap-2 mb-10">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      s <= step ? 'bg-green-500' : 'bg-gray-100'
                    }`}
                  />
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center shadow-inner">
                    {steps[step-1].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Paso {step}: {steps[step-1].title}</h3>
                    <p className="text-gray-500 leading-relaxed">
                      {steps[step-1].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Preview Mockup */}
              <div className="mt-12 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-[2.5rem] border border-green-100/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <PlusSquare className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Previsualización</h4>
                    <p className="text-sm text-gray-500 italic">"Eatly - Acceso Directo"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-8 border-t border-gray-100 bg-white/80 backdrop-blur-md">
              <motion.button
                onClick={handleShortcutClick}
                className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all active:scale-[0.98]"
                whileTap={{ scale: 0.95 }}
              >
                <PlusSquare className="w-5 h-5" />
                <span>{step === 3 ? 'Ya lo añadí' : 'Siguiente Paso'}</span>
                {step < 3 && <ChevronRight className="w-5 h-5" />}
              </motion.button>
              <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-widest">
                Exclusivo para iPhone & iPad
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
