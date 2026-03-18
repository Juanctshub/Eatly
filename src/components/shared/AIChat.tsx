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
  ExternalLink
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
}

// Quick action buttons for the chat
const quickActions = [
  { label: '¿Qué puedo comer?', icon: Utensils, prompt: '¿Qué puedo comer hoy con mis restricciones alimentarias?' },
  { label: '¿Qué debo evitar?', icon: AlertTriangle, prompt: '¿Qué alimentos debo evitar según mis restricciones? Dame una lista clara.' },
  { label: 'Recetas seguras', icon: ChefHat, prompt: 'Dame 3 recetas seguras para alguien con mis restricciones, con links a las recetas.' },
  { label: 'Tips nutricionales', icon: Lightbulb, prompt: 'Dame consejos nutricionales personalizados para mi dieta y restricciones.' },
];

const mealTypeIcons: Record<string, any> = {
  desayuno: Coffee,
  almuerzo: Sun,
  cena: Moon,
};

export default function AIChat({ isOpen, onClose, restrictions, foods, mealType = 'almuerzo' }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = getInitialGreeting();
      setMessages([{
        id: 'greeting',
        role: 'assistant',
        content: greeting,
        timestamp: new Date().toISOString()
      }]);
    }
  }, [isOpen]);

  const getInitialGreeting = () => {
    const restrictionCount = restrictions.length;
    const foodCount = foods.length;
    
    if (restrictionCount === 0) {
      return `¡Hola! 👋 Soy Roko, tu nutriólogo personal con IA.\n\nNo tienes restricciones registradas aún. Puedo ayudarte a:\n\n✅ Sugerir recetas deliciosas\n✅ Darte tips nutricionales\n✅ Recomendar platillos para tu ${mealType}\n\n¿En qué puedo ayudarte hoy?`;
    }
    
    const restrictionList = restrictions.slice(0, 3).map(r => r.foodItem).join(', ');
    const moreCount = restrictionCount > 3 ? ` y ${restrictionCount - 3} más` : '';
    
    return `¡Hola! 👋 Soy Roko, tu nutriólogo personal con IA.\n\nVeo que tienes ${restrictionCount} restricción${restrictionCount > 1 ? 'es' : ''}: ${restrictionList}${moreCount}\n\nPara tu ${mealType}, puedo ayudarte a:\n\n✅ Encontrar recetas seguras\n⛔ Identificar qué evitar\n💡 Darte consejos personalizados\n\n¿Qué te gustaría saber?`;
  };

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
          restrictions: restrictions.map(r => ({
            foodItem: r.foodItem,
            reason: r.reason,
            severity: r.severity
          })),
          foods: foods.map(f => ({
            name: f.name,
            category: f.category
          })),
          mealType,
          conversationHistory: messages.slice(-6).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Error al procesar mensaje');
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (err: any) {
      setError(err.message || 'Error de conexión');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 'greeting-new',
      role: 'assistant',
      content: getInitialGreeting(),
      timestamp: new Date().toISOString()
    }]);
    setError(null);
  };

  // Format message content with links
  const formatContent = (content: string) => {
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-1"
          >
            {part.length > 40 ? part.substring(0, 40) + '...' : part}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 flex flex-col bg-white dark:bg-gray-800"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Roko 🥗
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Tu Nutriólogo</span>
                </h2>
                <p className="text-sm text-white/80">
                  Asistente de nutrición con IA
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={clearChat}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="w-5 h-5 text-white" />
              </motion.button>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
          
          {/* Restrictions Summary */}
          {restrictions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {restrictions.slice(0, 4).map((r) => (
                <span
                  key={r.id}
                  className="px-2 py-1 bg-white/20 rounded-full text-xs text-white flex items-center gap-1"
                >
                  ⛔ {r.foodItem}
                </span>
              ))}
              {restrictions.length > 4 && (
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                  +{restrictions.length - 4} más
                </span>
              )}
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-violet-500 text-white rounded-br-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <Bot className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {formatContent(message.content)}
                    </div>
                    {message.role === 'user' && (
                      <User className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md p-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-violet-500" />
                  <Loader2 className="w-5 h-5 animate-spin text-violet-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Pensando...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4"
            >
              <p className="text-sm text-red-600 dark:text-red-400">
                ⚠️ {error}
              </p>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Preguntas rápidas:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  onClick={() => sendMessage(action.prompt)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregúntame qué puedes comer..."
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-500"
              disabled={isLoading}
            />
            <motion.button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-5 h-5 text-white" />
            </motion.button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Las recomendaciones son orientativas. Consulta siempre a un profesional de salud.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
