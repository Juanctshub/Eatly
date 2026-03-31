'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  Utensils,
  AlertTriangle,
  Lightbulb,
  ChefHat,
  Coffee,
  Sun,
  Moon,
  Trash2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface Restriction {
  id: string;
  foodItem: string;
  reason: string;
  severity: string;
}

interface Food {
  id: string;
  name: string;
  category?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  restrictions: Restriction[];
  foods: Food[];
  mealType?: string;
  userData: any;
}

const quickActions = [
  { label: '¿Qué comer?', icon: Utensils, prompt: '¿Qué puedo comer hoy sugerido para mi dieta?' },
  { label: 'Peligros', icon: AlertTriangle, prompt: '¿Qué alimentos son peligrosos para mi específicamente?' },
  { label: 'Recetas', icon: ChefHat, prompt: 'Dame 3 recetas rápidas para mis restricciones.' },
  { label: 'Modo Vida', icon: Lightbulb, prompt: 'Consejos de salud para mis condiciones actuales.' },
];

export default function AIChat({ isOpen, onClose, restrictions, foods, mealType = 'almuerzo', userData }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const restrictionNames = restrictions.map(r => r.foodItem).join(', ');
      const greeting = restrictions.length > 0 
        ? `¡Hola! Soy Roko 🥗. Veo que tienes restricciones con: **${restrictionNames}**. \n\n¿Quieres que te sugiera algo seguro para tu ${mealType}?`
        : "¡Hola! Soy Roko 🥗, tu asistente nutricional. \n\nCuéntame, ¿qué tienes pensado comer hoy o qué ingredientes tienes a mano?";
        
      setMessages([{
        id: 'greeting',
        role: 'assistant',
        content: greeting,
        timestamp: new Date().toISOString()
      }]);
    }
  }, [isOpen]);

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText.trim(),
          restrictions: restrictions.map(r => ({ foodItem: r.foodItem, reason: r.reason, severity: r.severity })),
          foods,
          mealType,
          userData,
          conversationHistory: messages.slice(-4).map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error || 'Fallo de IA');

      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp
      }]);
    } catch (err: any) {
      setError('Lo siento, tuve un problema al procesar tu mensaje. ¡Por favor inténtalo de nuevo!');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-lg bg-white dark:bg-black h-[92vh] rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden border-t border-white/10"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Apple Style Header */}
        <div className="pt-2 px-6 pb-4 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 relative z-10">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-800 rounded-full mx-auto mt-1 mb-4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-none mb-1">Roko AI</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Nutriólogo Oficial</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <motion.button 
                onClick={clearChat} 
                className="w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
              <motion.button 
                onClick={onClose} 
                className="w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-900 dark:text-white"
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scrollbar-hide bg-gray-50/50 dark:bg-black/20">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col gap-1.5 max-w-[88%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-5 py-3.5 rounded-3xl text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-br-none shadow-lg shadow-green-500/20'
                        : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm border border-gray-100 dark:border-white/5'
                    }`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>
                        {line}
                      </p>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium px-2">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white dark:bg-gray-900 px-5 py-4 rounded-3xl rounded-bl-none border border-gray-100 dark:border-white/5 shadow-sm flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                </div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-tighter">Roko está pensando</span>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-4 rounded-3xl">
              <div className="flex gap-3 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-medium leading-relaxed">{error}</p>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Interaction Area */}
        <div className="p-6 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5">
          {messages.length < 3 && !isLoading && (
            <div className="mb-5 flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  onClick={() => sendMessage(action.prompt)}
                  className="px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2 border border-gray-100 dark:border-white/5"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </motion.button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex-1 relative group">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Pregunta a Roko..."
                className="w-full pl-5 pr-12 py-4 bg-gray-100 dark:bg-white/5 rounded-2xl text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500/50 transition-all border border-transparent focus:bg-white dark:focus:bg-black dark:focus:border-white/10"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/40 disabled:opacity-30 disabled:shadow-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-center text-gray-400 font-medium leading-relaxed">
            Roko usa IA para asesorarte. Siempre valida con un médico profesional.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
