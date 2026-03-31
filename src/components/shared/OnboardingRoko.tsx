'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  User, 
  Target, 
  AlertTriangle, 
  Activity,
  CheckCircle2
} from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: any) => void;
}

export default function OnboardingRoko({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    restrictions: [] as any[],
    activityLevel: 'Moderado',
  });
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      id: 'name',
      question: '¡Hola! Soy Roko, tu nuevo nutriólogo residente. Para empezar, ¿cómo te llamas?',
      placeholder: 'Escribe tu nombre...',
      icon: <User className="w-6 h-6 text-violet-500" />,
      color: 'violet',
    },
    {
      id: 'goal',
      question: (name: string) => `Mucho gusto, ${name}. Cuéntame, ¿cuál es tu meta principal de salud hoy?`,
      placeholder: 'Ej: Bajar de peso, ganar músculo...',
      icon: <Target className="w-6 h-6 text-blue-500" />,
      color: 'blue',
    },
    {
      id: 'restrictions',
      question: 'Entendido. Ahora, ¿tienes alguna alergia o restricción alimentaria importante?',
      placeholder: 'Ej: Soya, Gluten, Maní...',
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
      color: 'amber',
    },
    {
      id: 'activity',
      question: 'Y por último, ¿cómo describirías tu nivel de actividad física diaria?',
      options: ['Sedentario', 'Moderado', 'Activo', 'Muy Activo'],
      icon: <Activity className="w-6 h-6 text-green-500" />,
      color: 'green',
    }
  ];

  const handleNext = () => {
    const currentStepId = steps[step].id;
    let nextFormData = { ...formData };
    
    if (currentStepId === 'name') nextFormData = { ...formData, name: currentInput };
    if (currentStepId === 'goal') nextFormData = { ...formData, goal: currentInput };
    if (currentStepId === 'restrictions') {
      const items = currentInput.split(',').filter(i => i.trim()).map(i => ({ foodItem: i.trim(), reason: 'alergia', severity: 'severa' }));
      nextFormData = { ...formData, restrictions: items };
    }
    
    setFormData(nextFormData);
    
    if (step < steps.length - 1) {
      setCurrentInput('');
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      onComplete(nextFormData);
    }
  };

  const handleOptionClick = (option: string) => {
    const finalData = { ...formData, activityLevel: option };
    setFormData(finalData);
    setIsSubmitting(true);
    // Envio inmediato con los datos finales garantizados
    onComplete(finalData);
  };

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 800);
    return () => clearTimeout(timer);
  }, [step]);

  const currentColor = steps[step]?.color || 'violet';

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute top-[-10%] left-[-10%] w-80 h-80 rounded-full blur-3xl opacity-50 transition-colors duration-1000 ${
            currentColor === 'violet' ? 'bg-violet-100' :
            currentColor === 'green' ? 'bg-green-100' :
            currentColor === 'blue' ? 'bg-blue-100' : 'bg-amber-100'
          }`}
        />
        <motion.div 
          className={`absolute bottom-[-10%] right-[-10%] w-80 h-80 rounded-full blur-3xl opacity-50 transition-colors duration-1000 ${
            currentColor === 'violet' ? 'bg-blue-100' :
            currentColor === 'green' ? 'bg-emerald-100' :
            currentColor === 'blue' ? 'bg-violet-100' : 'bg-orange-100'
          }`}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {steps.map((s, i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i < step ? 'bg-gray-300' : 
                i === step ? (
                  currentColor === 'violet' ? 'bg-violet-500' :
                  currentColor === 'green' ? 'bg-green-500' :
                  currentColor === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
                ) : 'bg-gray-100'
              }`} 
            />
          ))}
        </div>

        {/* Chat Avatar */}
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl mb-4 overflow-hidden relative transition-all duration-500 ${
            currentColor === 'violet' ? 'bg-gradient-to-tr from-violet-500 to-indigo-500 shadow-violet-500/20' :
            currentColor === 'green' ? 'bg-gradient-to-tr from-green-500 to-emerald-500 shadow-green-500/20' :
            currentColor === 'blue' ? 'bg-gradient-to-tr from-blue-500 to-cyan-500 shadow-blue-500/20' :
            'bg-gradient-to-tr from-amber-500 to-orange-500 shadow-amber-500/20'
          }`}>
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
            <motion.span 
              className="text-4xl relative z-10"
              animate={isSubmitting ? { rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: isSubmitting ? Infinity : 0 }}
            >
              {isSubmitting ? '✨' : '🤖'}
            </motion.span>
          </div>
          <div className={`px-4 py-1.5 rounded-full transition-colors duration-500 ${
            currentColor === 'violet' ? 'bg-violet-100' :
            currentColor === 'green' ? 'bg-green-100' :
            currentColor === 'blue' ? 'bg-blue-100' : 'bg-amber-100'
          }`}>
            <span className={`text-xs font-bold tracking-wider uppercase transition-colors duration-500 ${
              currentColor === 'violet' ? 'text-violet-600' :
              currentColor === 'green' ? 'text-green-600' :
              currentColor === 'blue' ? 'text-blue-600' : 'text-amber-600'
            }`}>
              Nutriólogo Residente
            </span>
          </div>
        </motion.div>

        {/* Question Area */}
        <div className="min-h-[120px] mb-8 text-center px-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="submitting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center relative"
              >
                {/* Floating Particles Simulation */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full blur-[1px]"
                    style={{ 
                      backgroundColor: i % 2 === 0 ? '#8b5cf6' : '#10b981',
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{ 
                      x: [0, (i - 2.5) * 40, (i - 2.5) * 60],
                      y: [0, -40, -80],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
                
                <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">¡Genial, {formData.name}!</h2>
                <div className="bg-violet-500/5 border border-violet-500/10 rounded-2xl p-4 mb-4 backdrop-blur-sm">
                   <p className="text-violet-600 font-bold text-sm mb-1 uppercase tracking-wider">Perfil Optimizado</p>
                   <p className="text-gray-600 text-xs">Objetivo: <span className="font-bold text-gray-900">{formData.goal}</span></p>
                   <p className="text-gray-600 text-xs">Actividad: <span className="font-bold text-gray-900">{formData.activityLevel}</span></p>
                </div>
                <p className="text-gray-400 text-sm animate-pulse">Sincronizando con Roko...</p>
              </motion.div>
            ) : !isTyping ? (
              <motion.h2 
                key={step}
                className="text-2xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {typeof steps[step].question === 'function' 
                  ? (steps[step].question as any)(formData.name) 
                  : steps[step].question as string}
              </motion.h2>
            ) : (
              <motion.div 
                key="typing"
                className="flex items-center justify-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  currentColor === 'violet' ? 'bg-violet-400' :
                  currentColor === 'green' ? 'bg-green-400' :
                  currentColor === 'blue' ? 'bg-blue-400' : 'bg-amber-400'
                }`} style={{ animationDelay: '0ms' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  currentColor === 'violet' ? 'bg-violet-400' :
                  currentColor === 'green' ? 'bg-green-400' :
                  currentColor === 'blue' ? 'bg-blue-400' : 'bg-amber-400'
                }`} style={{ animationDelay: '150ms' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  currentColor === 'violet' ? 'bg-violet-400' :
                  currentColor === 'green' ? 'bg-green-400' :
                  currentColor === 'blue' ? 'bg-blue-400' : 'bg-amber-400'
                }`} style={{ animationDelay: '300ms' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <AnimatePresence>
          {!isSubmitting && (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.5 }}
            >
              {steps[step].options ? (
                <div className="grid grid-cols-2 gap-3">
                  {steps[step].options!.map((option) => (
                    <motion.button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className="p-5 bg-white border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-700 hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                      <ChevronRight className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-70">
                    {steps[step].icon}
                  </div>
                  <input 
                    autoFocus
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && currentInput.trim() && handleNext()}
                    placeholder={steps[step].placeholder}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-3xl py-5 pl-14 pr-20 text-gray-900 font-medium outline-none focus:border-violet-500 focus:bg-white transition-all shadow-sm"
                  />
                  {currentInput.trim().length > 0 && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={handleNext}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 text-white rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                        currentColor === 'violet' ? 'bg-violet-500 shadow-violet-500/20' :
                        currentColor === 'green' ? 'bg-green-500 shadow-green-500/20' :
                        currentColor === 'blue' ? 'bg-blue-500 shadow-blue-500/20' : 'bg-amber-500 shadow-amber-500/20'
                      }`}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer info */}
        {!isSubmitting && (
          <p className="mt-8 text-center text-xs text-gray-400 font-medium uppercase tracking-widest">
            {step === 0 ? 'Toda la información es privada' : `Paso ${step + 1} de ${steps.length}`}
          </p>
        )}
      </div>
    </div>
  );
}
