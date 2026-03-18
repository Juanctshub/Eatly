'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseVoiceCommandsProps {
  onCommand: (command: string, transcript: string) => void;
  language?: string;
}

interface VoiceCommandsResult {
  isListening: boolean;
  transcript: string;
  error: string | null;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

// Command patterns with priorities
const COMMAND_PATTERNS = [
  // Navigation commands - HIGH PRIORITY
  { patterns: ['ir a inicio', 'ir al inicio', 've al inicio', 'ir a home', 'menú principal', 'menu principal'], command: 'navigate', data: 'home' },
  { patterns: ['ir a restricciones', 've a restricciones', 'ver restricciones', 'mis restricciones'], command: 'navigate', data: 'restrictions' },
  { patterns: ['ir a comidas', 've a comidas', 'ver comidas', 'mis comidas', 'ir a alimentos'], command: 'navigate', data: 'foods' },
  { patterns: ['ir a sugerencias', 've a sugerencias', 'ver sugerencias', 'qué puedo comer', 'que puedo comer', 'dame sugerencias'], command: 'navigate', data: 'suggestions' },
  
  // Specific action commands - HIGH PRIORITY
  { patterns: ['ver mapa', 'ver restaurantes', 'ir a restaurantes', 'restaurantes cercanos', 'donde comer', 'dónde comer'], command: 'restaurants', data: 'show' },
  { patterns: ['escanear producto', 'escanear código', 'escanear codigo', 'abrir escáner', 'abrir escaner', 'escáner', 'escaner'], command: 'scan', data: 'barcode' },
  
  // Add commands - MEDIUM PRIORITY (must capture the food item)
  { patterns: [/^agregar restricción (.+)$/, /^añadir restricción (.+)$/, /^tengo alergia a (.+)$/, /^soy alérgico a (.+)$/, /^soy alergico a (.+)$/], command: 'add_restriction', data: 'voice' },
  { patterns: [/^agregar alimento (.+)$/, /^añadir alimento (.+)$/, /^tengo (.+) disponible$/], command: 'add_food', data: 'voice' },
  
  // Open specific sections
  { patterns: ['abrir configuración', 'ir a configuración', 'ver configuración', 'ajustes'], command: 'settings', data: 'open' },
  { patterns: ['chatear con roko', 'hablar con roko', 'abrir chat', 'ir al chat', 'abrir roko'], command: 'chat', data: 'open' },
  
  // Help command
  { patterns: ['ayuda', 'comandos de voz', 'qué puedo decir', 'que puedo decir'], command: 'help', data: 'show' },
  
  // Quick add modals
  { patterns: ['nueva restricción', 'agregar restricción', 'añadir restricción'], command: 'add', data: 'restriction' },
  { patterns: ['nuevo alimento', 'agregar alimento', 'añadir alimento'], command: 'add', data: 'food' },
  
  // Meal type selection
  { patterns: ['para el desayuno', 'es para desayunar', 'tipo desayuno'], command: 'mealType', data: 'desayuno' },
  { patterns: ['para el almuerzo', 'es para almorzar', 'tipo almuerzo'], command: 'mealType', data: 'almuerzo' },
  { patterns: ['para la cena', 'es para cenar', 'tipo cena'], command: 'mealType', data: 'cena' },
];

export function useVoiceCommands({
  onCommand,
  language = 'es-ES',
}: UseVoiceCommandsProps): VoiceCommandsResult {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isMountedRef = useRef(true);
  const onCommandRef = useRef(onCommand);

  // Keep onCommand ref updated
  useEffect(() => {
    onCommandRef.current = onCommand;
  }, [onCommand]);

  useEffect(() => {
    isMountedRef.current = true;
    
    // Check if Speech Recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Tu navegador no soporta reconocimiento de voz. Usa Chrome, Edge o Safari para esta función.');
      return;
    }
    
    setIsSupported(true);
    setError(null);
    
    // Create recognition instance
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;
    recognition.maxAlternatives = 3;
    
    recognition.onstart = () => {
      if (isMountedRef.current) {
        setIsListening(true);
        setError(null);
      }
    };
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      if (!isMountedRef.current) return;
      
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript.toLowerCase().trim();
      
      setTranscript(text);
      
      if (result.isFinal) {
        // Process command
        processCommand(text, (cmd, data) => {
          onCommandRef.current(cmd, data);
        });
      }
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (!isMountedRef.current) return;
      
      setIsListening(false);
      
      let errorMessage = 'Error desconocido';
      
      switch (event.error) {
        case 'network':
          errorMessage = '⚠️ Error de conexión. El reconocimiento de voz requiere internet activo. Verifica tu conexión e intenta de nuevo.';
          break;
        case 'not-allowed':
        case 'permission-denied':
          errorMessage = '❌ Permiso denegado. Habilita el micrófono en la configuración del navegador y recarga la página.';
          break;
        case 'no-speech':
          errorMessage = '🔇 No detecté voz. Habla más cerca del micrófono e intenta de nuevo.';
          break;
        case 'audio-capture':
          errorMessage = '🎤 No encuentro micrófono. Verifica que tu dispositivo tenga uno disponible.';
          break;
        case 'aborted':
          // Don't show error for user-initiated abort
          return;
        case 'language-not-supported':
          errorMessage = '🌍 Idioma no soportado completamente. Usando español disponible.';
          break;
        case 'service-not-allowed':
          errorMessage = '🚫 Este navegador no permite reconocimiento de voz. Prueba con Chrome o Edge.';
          break;
        default:
          errorMessage = `⚠️ Error: ${event.error}. Intenta de nuevo.`;
      }
      
      setError(errorMessage);
    };
    
    recognition.onend = () => {
      if (isMountedRef.current) {
        setIsListening(false);
      }
    };
    
    recognitionRef.current = recognition;
    
    return () => {
      isMountedRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore errors on cleanup
        }
      }
    };
  }, [language]);

  const startListening = useCallback(() => {
    setError(null);
    setTranscript('');
    
    if (!isSupported) {
      setError('Reconocimiento de voz no disponible en este navegador');
      return;
    }
    
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (e: any) {
        console.log('Recognition error:', e.message);
        // Recognition might already be running
        if (e.message?.includes('already started')) {
          try {
            recognitionRef.current.stop();
            setTimeout(() => {
              recognitionRef.current?.start();
            }, 100);
          } catch {
            setError('Error al reiniciar. Espera un momento e intenta de nuevo.');
          }
        }
      }
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore errors
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
}

// Process voice commands with priority matching
function processCommand(transcript: string, onCommand: (command: string, data: string) => void) {
  const text = transcript.toLowerCase().trim();
  
  // Check each command pattern in order of priority
  for (const { patterns, command, data } of COMMAND_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern instanceof RegExp) {
        const match = text.match(pattern);
        if (match) {
          // Extract captured group if exists
          const capturedData = match[1] || data;
          onCommand(command, capturedData);
          return;
        }
      } else if (text.includes(pattern) || text === pattern) {
        onCommand(command, data);
        return;
      }
    }
  }
  
  // If no specific command matched, send to AI chat
  onCommand('ai_query', transcript);
}

// Add type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
