'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Loader2,
  Sparkles,
  Shield,
  AlertTriangle,
  ChefHat,
  Mic,
  Copy,
  Check,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatSectionProps {
  restrictions: Array<{ foodItem: string; reason: string; severity: string }>;
  foods: Array<{ name: string; category?: string }>;
  mealType: string;
  userData: any;
  onClose: () => void;
  initialMessage?: string;
}

export default function AIChatSection({
  restrictions,
  foods,
  mealType,
  userData,
  onClose,
  initialMessage,
}: AIChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Send initial message if provided
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      sendMessage(initialMessage);
    }
  }, [initialMessage]);

  // Send message to AI
  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
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
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.success && data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Error al obtener respuesta');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ Lo siento, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Quick actions
  const quickActions = [
    { icon: '🍽️', text: '¿Qué puedo comer hoy?', color: 'from-green-400 to-emerald-500' },
    { icon: '⚠️', text: '¿Qué debo evitar?', color: 'from-red-400 to-rose-500' },
    { icon: '📖', text: 'Dame una receta segura', color: 'from-blue-400 to-indigo-500' },
    { icon: '💡', text: 'Tips para mi dieta', color: 'from-purple-400 to-violet-500' },
  ];

  // Copy message to clipboard
  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      console.error('Failed to copy');
    }
  };

  // Format message with markdown-like styling
  const formatMessage = (content: string) => {
    // Split by lines and format
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} className="text-lg font-bold text-gray-900 mt-4 mb-2">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h4 key={index} className="text-base font-semibold text-gray-800 mt-3 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      // Bold
      if (line.startsWith('**') || line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/);
        return (
          <p key={index} className="text-gray-700 mb-1">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-semibold text-gray-900">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      }
      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={index} className="text-gray-700 ml-4 mb-1">
            {line.substring(2)}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="text-gray-700 ml-4 mb-1 list-decimal">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={index} className="h-2" />;
      }
      // Regular text
      return (
        <p key={index} className="text-gray-700 mb-1">
          {line}
        </p>
      );
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-50 z-50 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-4 safe-area-top">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Roko tu Nutriólogo</h1>
                <p className="text-white/70 text-xs">Tu asistente de alimentación segura</p>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Context Banner */}
      {(restrictions.length > 0 || foods.length > 0) && (
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-4 py-3 border-b border-violet-100">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <Shield className="w-4 h-4 text-violet-500 flex-shrink-0" />
            {restrictions.length > 0 && (
              <span className="text-xs text-violet-700 bg-violet-100 px-2 py-1 rounded-full whitespace-nowrap">
                {restrictions.length} restricciones
              </span>
            )}
            {foods.length > 0 && (
              <span className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-full whitespace-nowrap">
                {foods.length} alimentos
              </span>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-4xl">🤖</span>
            </motion.div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">¡Hola! Soy Roko</h2>
            <p className="text-gray-500 text-sm mb-6 px-8">
              Tu nutriólogo personal. Pregúntame sobre alimentos seguros, recetas, o lo que necesites saber sobre tu dieta.
            </p>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 px-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  onClick={() => sendMessage(action.text)}
                  className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-2xl text-left shadow-lg`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl mb-2 block">{action.icon}</span>
                  <span className="text-sm font-medium">{action.text}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Message list */}
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className={`max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-3xl rounded-br-lg px-5 py-3'
                    : 'bg-white rounded-3xl rounded-bl-lg px-5 py-4 shadow-sm border border-gray-100'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🤖</span>
                    <span className="text-xs font-semibold text-violet-600">Roko</span>
                  </div>
                )}
                <div
                  className={
                    message.role === 'user'
                      ? 'text-sm leading-relaxed'
                      : 'text-sm leading-relaxed'
                  }
                >
                  {message.role === 'assistant'
                    ? formatMessage(message.content)
                    : message.content}
                </div>
                {message.role === 'assistant' && (
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <motion.button
                      onClick={() => copyToClipboard(message.content, message.id)}
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-3xl rounded-bl-lg px-5 py-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🤖</span>
                  <div className="flex items-center gap-1">
                    <motion.div
                      className="w-2 h-2 bg-violet-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-violet-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-violet-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 px-4 py-4 safe-area-bottom">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Pregúntame lo que necesites..."
              className="w-full px-5 py-4 bg-gray-100 rounded-2xl text-gray-900 outline-none focus:ring-2 focus:ring-violet-500 pr-12"
              disabled={loading}
            />
          </div>
          <motion.button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Send className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
