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
  CheckCircle2,
  Shield,
  Heart,
  Zap
} from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: any) => void;
  isSubmitting?: boolean;
}

export default function OnboardingRoko({ onComplete, isSubmitting = false }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    restrictions: [] as any[],
    activityLevel: 'Moderado',
    // New fields v7.1
    weight: '' as string | number,
    height: '' as string | number,
    age: '' as string | number,
    medicalConditions: [] as string[],
    dislikedFoods: [] as string[],
  });
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const steps = [
    {
      id: 'name',
      question: '¡Hola! Soy Roko, tu nuevo nutriólogo residente. Para empezar, ¿cómo te llamas?',
      placeholder: 'Escribe tu nombre...',
      icon: <User className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500 to-teal-600',
      mood: '👋',
      bg: 'bg-emerald-50/10'
    },
    {
      id: 'goal',
      question: (name: string) => `Mucho gusto, ${name}. Cuéntame, ¿cuál es tu meta principal de salud?`,
      placeholder: 'Ej: Bajar de peso, ganar músculo...',
      icon: <Target className="w-6 h-6 text-violet-400" />,
      color: 'from-violet-500 to-purple-600',
      mood: '🎯',
      bg: 'bg-violet-50/10'
    },
    {
      id: 'biometric',
      question: 'Para raciones precisas, ingresa tu Peso (kg), Altura (cm) y Edad.',
      isBiometric: true, // Custom UI handling
      icon: <Activity className="w-6 h-6 text-rose-400" />,
      color: 'from-rose-500 to-pink-600',
      mood: '🧘',
      bg: 'bg-rose-50/10'
    },
    {
      id: 'medical',
      question: 'Importante: ¿Tienes alguna condición médica como Diabetes o Hipertensión?',
      placeholder: 'Escribe condiciones o "Ninguna"...',
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      color: 'from-blue-500 to-cyan-600',
      mood: '🛡️',
      bg: 'bg-blue-50/10'
    },
    {
      id: 'restrictions',
      question: '¿Tienes alguna alergia o restricción alimentaria severa?',
      placeholder: 'Ej: Soya, Gluten, Maní...',
      icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
      color: 'from-orange-500 to-amber-600',
      mood: '⚠️',
      bg: 'bg-orange-50/10'
    },
    {
      id: 'dislikes',
      question: 'Y aparte de alergias, ¿hay algún alimento que simplemente NO te guste?',
      placeholder: 'Ej: Queso, Brócoli, Cebolla...',
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      color: 'from-pink-500 to-rose-600',
      mood: '👅',
      bg: 'bg-pink-50/10'
    },
    {
      id: 'activity',
      question: 'Por último, ¿cuál es tu nivel de actividad física diaria?',
      options: ['Sedentario', 'Moderado', 'Activo', 'Muy Activo'],
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      color: 'from-yellow-500 to-orange-600',
      mood: '⚡',
      bg: 'bg-yellow-50/10'
    }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    const currentStepId = steps[step].id;
    const value = currentInput.trim();
    
    // Validation for non-optional steps
    if (!value && !['restrictions', 'medical', 'dislikes', 'biometric'].includes(currentStepId)) return;

    setFormData(prev => {
      const next = { ...prev };
      if (currentStepId === 'name') next.name = value;
      if (currentStepId === 'goal') next.goal = value;
      if (currentStepId === 'medical') {
        next.medicalConditions = value.split(',').filter(i => i.trim()).map(i => i.trim());
      }
      if (currentStepId === 'restrictions') {
        next.restrictions = value.split(',').filter(i => i.trim()).map(i => ({ 
          foodItem: i.trim(), 
          reason: 'alergia', 
          severity: 'severa' 
        }));
      }
      if (currentStepId === 'dislikes') {
        next.dislikedFoods = value.split(',').filter(i => i.trim()).map(i => i.trim());
      }

      if (step < steps.length - 1) {
        setCurrentInput('');
        setStep(step + 1);
      } else {
        onComplete(next);
      }
      return next;
    });
  };

  const handleOptionClick = (option: string) => {
    setFormData(prev => {
      const finalData = { ...prev, activityLevel: option };
      onComplete(finalData);
      return finalData;
    });
  };

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 800);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="fixed inset-0 bg-[#0c0c0e] z-[100] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background decoration - Premium dynamic glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 transition-all duration-1000 bg-gradient-to-br ${currentStep.color}`}
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div 
          className={`absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 transition-all duration-1000 bg-gradient-to-tr ${currentStep.color}`}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -100, 0],
            y: [0, 100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Progress Bar - Elite Design */}
        <div className="flex gap-1.5 mb-16 px-4">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 relative h-1 group">
               <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
                 i <= step ? 'bg-white/20' : 'bg-white/5'
               }`} />
               <motion.div 
                 className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentStep.color}`}
                 initial={{ width: '0%' }}
                 animate={{ width: i <= step ? '100%' : '0%' }}
                 transition={{ duration: 0.8, ease: "circOut" }}
               />
               {i === step && (
                 <motion.div 
                   className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                   layoutId="progress-dot"
                 />
               )}
            </div>
          ))}
        </div>

        {/* Global Transparent Glass Card */}
        <motion.div 
          layout
          className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Robot Avatar - Premium Moods */}
            <motion.div 
              key={step}
              className={`w-20 h-20 sm:w-28 sm:h-28 rounded-[25px] sm:rounded-[35px] flex items-center justify-center shadow-2xl mb-6 sm:mb-8 relative group cursor-default`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className={`absolute inset-0 rounded-[25px] sm:rounded-[35px] bg-gradient-to-br opacity-20 blur-xl ${currentStep.color}`} />
              <div className={`absolute inset-0 rounded-[25px] sm:rounded-[35px] border border-white/20 bg-white/5`} />
              
              <motion.span 
                className="text-4xl sm:text-5xl relative z-10"
                animate={isSubmitting ? { scale: [1, 1.2, 1], rotate: [0, 360] } : { y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isSubmitting ? '✨' : currentStep.mood}
              </motion.span>

              {/* Floating Pulse Rings */}
              <motion.div 
                className={`absolute inset-[-8px] sm:inset-[-10px] border border-white/5 rounded-[30px] sm:rounded-[45px]`}
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            {/* Question Text - Premium Typography */}
            <div className="min-h-[120px] sm:min-h-[140px] w-full flex flex-col items-center justify-center mb-8 sm:mb-10">
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                      ¡Todo listo!
                    </h2>
                    <p className="text-white/50 text-sm sm:text-base font-medium tracking-wide animate-pulse">
                      Optimizando tu perfil de salud...
                    </p>
                  </motion.div>
                ) : !isTyping ? (
                  <motion.h2 
                    key={step}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center leading-[1.2] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 px-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {typeof currentStep.question === 'function' 
                      ? (currentStep.question as any)(formData.name) 
                      : currentStep.question as string}
                  </motion.h2>
                ) : (
                  <motion.div 
                    key="typing"
                    className="flex items-center justify-center gap-2"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-white/20 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input & Options - Premium Controls */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                {!isSubmitting && (
                  <motion.div 
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {currentStep.options ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {currentStep.options!.map((option) => (
                          <motion.button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="group relative h-16 sm:h-20 bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl text-sm sm:text-base font-bold text-white transition-all overflow-hidden"
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-r ${currentStep.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    ) : currentStep.isBiometric ? (
                      <div className="space-y-4 max-w-lg mx-auto">
                        <div className="grid grid-cols-3 gap-3">
                          <input 
                            type="number"
                            placeholder="Peso (kg)"
                            value={formData.weight || ''}
                            onChange={(e) => setFormData({...formData, weight: e.target.value})}
                            className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 text-white text-center outline-none focus:border-rose-500/50"
                          />
                          <input 
                            type="number"
                            placeholder="Altura (cm)"
                            value={formData.height || ''}
                            onChange={(e) => setFormData({...formData, height: e.target.value})}
                            className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 text-white text-center outline-none focus:border-rose-500/50"
                          />
                          <input 
                            type="number"
                            placeholder="Edad"
                            value={formData.age || ''}
                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                            className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 text-white text-center outline-none focus:border-rose-500/50"
                          />
                        </div>
                        <motion.button
                          onClick={handleNext}
                          disabled={!formData.weight || !formData.height || !formData.age}
                          className={`w-full py-4 bg-gradient-to-r ${currentStep.color} text-white font-bold rounded-2xl disabled:opacity-30`}
                          whileHover={{ scale: 1.02 }}
                        >
                          Continuar
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 max-w-lg mx-auto">
                        <div className="relative">
                          <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-40">
                            {currentStep.icon}
                          </div>
                          <input 
                            autoFocus
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (currentInput.trim() || ['restrictions', 'medical', 'dislikes'].includes(currentStep.id)) && handleNext()}
                            placeholder={currentStep.placeholder}
                            className="w-full bg-white/[0.05] border border-white/10 rounded-2xl sm:rounded-[30px] py-4 sm:py-6 pl-14 sm:pl-16 pr-6 sm:pr-24 text-white font-medium text-base sm:text-lg placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
                          />
                        </div>
                        {(currentInput.trim().length > 0 || ['restrictions', 'medical', 'dislikes'].includes(currentStep.id)) && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleNext}
                            className={`w-full sm:w-14 sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2 h-14 sm:h-12 bg-gradient-to-r ${currentStep.color} text-white rounded-2xl shadow-xl shadow-black/20 flex items-center justify-center`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ArrowRight className="w-6 h-6" />
                          </motion.button>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Footer Info - Subtle & Clean */}
        {!isSubmitting && (
          <motion.div 
            className="mt-8 sm:mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              Paso {step + 1} de {steps.length} • Perfil Privado & Seguro
            </p>
          </motion.div>
        )}
      </div>

      {/* Decorative Floating Blobs */}
      <div className="absolute top-[15%] right-[10%] w-32 h-32 border border-white/5 rounded-full animate-spin-slow pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse pointer-events-none" />
    </div>
  );
}
