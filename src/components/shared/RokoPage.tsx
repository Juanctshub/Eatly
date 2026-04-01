'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Loader2,
  Sparkles,
  Shield,
  ChefHat,
  Mic,
  Copy,
  Check,
  Clock,
  Flame,
  ArrowRight,
  User,
  Brain,
} from 'lucide-react';

interface Suggestion {
  name: string;
  ingredients: string[];
  safetyReason: string;
  nutritionalBenefits: string;
  prepTime?: number;
  calories?: number;
  imageEmoji?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface RokoPageProps {
  restrictions: any[];
  foods: any[];
  mealType: string;
  userData: {
    name: string;
    goal: string;
    activityLevel: string;
    recentLogs: string;
  };
}

export default function RokoPage({
  restrictions,
  foods,
  mealType,
  userData,
}: RokoPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSuggestion, setActiveSuggestion] = useState<Suggestion | null>(null);
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting and proactive suggestion
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = `¡Hola, **${userData.name}**! Te estaba esperando. Veo que sigues enfocado en **${userData.goal}**. Tengo presente tus **${restrictions.length} restricciones** (especialmente lo relacionado a ${restrictions[0]?.foodItem || 'tus alergias'}) y los alimentos que tienes a mano. 

¿En qué puedo ayudarte hoy con tu alimentación?`;
      
      const timer = setTimeout(() => {
        setMessages([{
          id: '1',
          role: 'assistant',
          content: greeting,
          timestamp: new Date(),
        }]);
        generateProactiveSuggestion();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const generateProactiveSuggestion = async () => {
    setIsGeneratingSuggestion(true);
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          restrictions, 
          availableFoods: foods, 
          mealType,
          userData
        }),
      });
      const data = await response.json();
      if (data.success && data.suggestion) {
        setActiveSuggestion(data.suggestion);
      }
    } catch (error) {
      console.error('Error generating suggestion:', error);
    } finally {
      setIsGeneratingSuggestion(false);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          restrictions,
          foods,
          mealType,
          userData,
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Servidor de IA fuera de servicio');
      }

      const data = await response.json();
      if (data.success && data.response) {
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        }]);
      } else {
        throw new Error(data.error || 'Respuesta vacía de Groq');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ **Error de Conexión:** ${error.message}. Por favor, verifica tu conexión a internet o asegúrate de que el servidor esté configurado correctamente.`,
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) return <h3 key={index} className="text-lg font-bold mt-4 mb-2 dark:text-white">{line.replace('## ', '')}</h3>;
      if (line.startsWith('**') || line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/);
        return <p key={index} className="mb-1 dark:text-gray-200">{parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-emerald-600 dark:text-emerald-400">{part}</strong> : part)}</p>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) return <li key={index} className="ml-4 mb-1 dark:text-gray-300">{line.substring(2)}</li>;
      if (!line.trim()) return <div key={index} className="h-2" />;
      return <p key={index} className="mb-1 dark:text-gray-200 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 flex flex-col pt-8">
      {/* Premium Header Container */}
      <div className="px-6 mb-8 mt-4">
        <motion.div 
          className="relative overflow-hidden p-6 rounded-[32px] bg-white dark:bg-gray-800 shadow-2xl shadow-emerald-500/10 border border-emerald-500/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Animated Glow Background */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20 rotate-3">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Roko tu Nutriólogo</h1>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              </div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 opacity-80">Asistente Inteligente 360°</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1 px-6 space-y-6 pb-40">
        {/* Proactive Suggestion Card (The "Suggestions" Merge) */}
        <AnimatePresence>
          {(activeSuggestion || isGeneratingSuggestion) && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative p-6 rounded-[32px] bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 border border-slate-200 dark:border-gray-700 shadow-xl"
            >
              {isGeneratingSuggestion ? (
                <div className="flex flex-col items-center py-12 gap-4">
                  <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">Consultando el motor neural...</p>
                </div>
              ) : activeSuggestion && (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-emerald-600/60">Idea Recomendada</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-center mb-6">
                    <span className="text-5xl">{activeSuggestion.imageEmoji || '🥘'}</span>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{activeSuggestion.name}</h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[10px] bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded-full font-bold text-slate-500">{activeSuggestion.calories} kcal</span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full font-bold text-emerald-600">Alta Seguridad</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span className="text-[10px] font-black uppercase text-emerald-600">Verificación de Seguridad</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{activeSuggestion.safetyReason}</p>
                    </div>
                    
                    <motion.button 
                      onClick={() => sendMessage(`Cuéntame más sobre la receta de ${activeSuggestion.name}`)}
                      className="w-full py-4 bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-black/10 flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Ver Receta Detallada</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Section */}
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`max-w-[85%] ${
                message.role === 'user'
                  ? 'bg-slate-900 text-white rounded-[24px] rounded-tr-none px-5 py-3 shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-slate-900 dark:text-white rounded-[24px] rounded-tl-none px-5 py-4 border border-slate-100 dark:border-gray-700 shadow-sm'
              }`}>
                <div className="text-sm">
                  {message.role === 'assistant' ? formatMessage(message.content) : message.content}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Premium Input Area (Fixed over the Nav) */}
      <div className="fixed bottom-36 left-0 right-0 px-6 z-30">
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-[32px] -z-10 shadow-2xl border border-white/20 dark:border-white/5" />
          <div className="flex items-center gap-3 p-2 border border-white/30 dark:border-white/10 rounded-[28px]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Pregunta a Roko..."
              className="flex-1 bg-transparent px-5 py-3 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium text-sm"
              disabled={loading}
            />
            <motion.button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
