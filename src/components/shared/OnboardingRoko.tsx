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

  const steps = [
    {
      id: 'name',
      question: '¡Hola! Soy Roko, tu nuevo nutriólogo residente. Para empezar, ¿cómo te llamas?',
      placeholder: 'Escribe tu nombre...',
      icon: <User className="w-6 h-6 text-violet-500" />,
    },
    {
      id: 'goal',
      question: (name: string) => `Mucho gusto, ${name}. Cuéntame, ¿cuál es tu meta principal de salud hoy?`,
      placeholder: 'Ej: Bajar de peso, ganar músculo...',
      icon: <Target className="w-6 h-6 text-blue-500" />,
    },
    {
      id: 'restrictions',
      question: 'Entendido. Ahora, ¿tienes alguna alergia o restricción alimentaria importante?',
      placeholder: 'Ej: Soya, Gluten, Maní...',
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    },
    {
      id: 'activity',
      question: 'Y por último, ¿cómo describirías tu nivel de actividad física diaria?',
      options: ['Sedentario', 'Moderado', 'Activo', 'Muy Activo'],
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      const currentStepId = steps[step].id;
      if (currentStepId === 'name') setFormData({ ...formData, name: currentInput });
      if (currentStepId === 'goal') setFormData({ ...formData, goal: currentInput });
      if (currentStepId === 'restrictions') {
        const items = currentInput.split(',').map(i => ({ foodItem: i.trim(), reason: 'alergia', severity: 'severa' }));
        setFormData({ ...formData, restrictions: items });
      }
      
      setCurrentInput('');
      setStep(step + 1);
    } else {
      // Finalize
      onComplete(formData);
    }
  };

  const handleOptionClick = (option: string) => {
    setFormData({ ...formData, activityLevel: option });
    onComplete({ ...formData, activityLevel: option });
  };

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 800);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-violet-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-violet-500' : 'bg-gray-100'
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
          <div className="w-20 h-20 bg-gradient-to-tr from-violet-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl shadow-violet-500/20 mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
            <span className="text-4xl relative z-10">🤖</span>
          </div>
          <div className="bg-violet-100 px-4 py-1.5 rounded-full">
            <span className="text-xs font-bold text-violet-600 tracking-wider uppercase">Nutriólogo Residente</span>
          </div>
        </motion.div>

        {/* Question Area */}
        <div className="min-h-[120px] mb-8 text-center px-4">
          <AnimatePresence mode="wait">
            {!isTyping ? (
              <motion.h2 
                key={step}
                className="text-2xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                {typeof steps[step].question === 'function' 
                  ? (steps[step].question as any)(formData.name) 
                  : steps[step].question as string}
              </motion.h2>
            ) : (
              <motion.div 
                key="typing"
                className="flex items-center justify-center gap-1.5 h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {steps[step].options ? (
            <div className="grid grid-cols-2 gap-3">
              {steps[step].options!.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="p-4 bg-white border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-700 hover:border-violet-500 hover:bg-violet-50 transition-all flex items-center justify-between"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-50">
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/20"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          )}
        </motion.div>

        {/* Footer info */}
        <p className="mt-8 text-center text-xs text-gray-400 font-medium uppercase tracking-widest">
          {step === 0 ? 'Toda la información es privada' : `Paso ${step + 1} de ${steps.length}`}
        </p>
      </div>
    </div>
  );
}
