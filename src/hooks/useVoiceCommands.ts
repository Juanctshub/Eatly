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

// Commands with synonyms and better regex
const COMMAND_PATTERNS = [
  // Specific action commands with parameters - TOP PRIORITY
  { patterns: [/^(?:agregar|añadir|crear|pon|nueva) restricción (?:\s+de\s+)?(.+)$/i, /^(?:tengo|soy) (?:alergia|alérgico|alergico) (?:\s+a\s+)?(.+)$/i, /^(?:soy) intolerant[eo] (?:\s+a\s+)?(.+)$/i, /^(?:no puedo) (?:comer|tomar) (.+)$/i, /^(?:restricción) (.+)$/i], command: 'add_restriction', data: 'voice' },
  { patterns: [/^(?:agregar|añadir|crear|pon|nuevo) alimento (?:\s+de\s+)?(.+)$/i, /^(?:tengo) (.+) disponible[s]?$/i, /^(?:agrega) (.+)$/i, /^(?:compré|compre) (.+)$/i, /^(?:nuevo alimento) (.+)$/i, /^(?:alimento) (.+)$/i], command: 'add_food', data: 'voice' },
  
  // Navigation commands - HIGH PRIORITY
  { patterns: ['ir a inicio', 'ir al inicio', 've al inicio', 'regresar al inicio', 'ir a home', 'página principal', 'menú principal', 'pantalla de inicio', 'volver al inicio', 'llévame al inicio', 'llevame al inicio', 'mostrar inicio', 'ver inicio'], command: 'navigate', data: 'home' },
  { patterns: ['ir a restricciones', 've a restricciones', 'ver mis restricciones', 'ver alergias', 'mis restricciones', 'lista de restricciones', 'mis alergias', 'ver mis alergias', 'qué no puedo comer', 'que no puedo comer', 'mostrar restricciones', 'pantalla de restricciones'], command: 'navigate', data: 'restrictions' },
  { patterns: ['ir a comidas', 've a comidas', 'ver mis comidas', 'ver alimentos', 'mis comidas', 'ir a alimentos', 'lista de comidas', 'qué alimentos hay', 'que alimentos hay', 'mis alimentos', 'mostrar alimentos', 'pantalla de alimentos'], command: 'navigate', data: 'foods' },
  { patterns: ['ir a sugerencias', 've a sugerencias', 'ver sugerencias', 'qué sugerencias hay', 'que sugerencias hay', 'dame sugerencias', 'sugerencias de hoy', 'qué me recomiendas', 'que me recomiendas', 'qué cocinar', 'ver recetas', 'mostrar recetas', 'ir a recetas', 'ir a ideas'], command: 'navigate', data: 'suggestions' },
  
  // App Feature Toggle commands
  { patterns: ['ver mapa', 'abrir mapa', 'ver restaurantes', 'ir a restaurantes', 'restaurantes cercanos', 'dónde comer', 'donde comer', 'buscar restaurantes', 'mapa de comida', 'mostrar mapa'], command: 'restaurants', data: 'show' },
  { patterns: ['escanear producto', 'escanear código', 'escanear codigo', 'abrir escáner', 'abrir escaner', 'hacer escaneo', 'activar cámara', 'usar escáner', 'ver producto', 'escanear el producto'], command: 'scan', data: 'barcode' },
  { patterns: ['abrir configuración', 'ir a configuración', 'ver configuración', 'editar mi perfil', 'ajustes', 'configurar', 'mi cuenta', 'ver mi perfil', 'abrir ajustes'], command: 'settings', data: 'open' },
  { patterns: ['chatear con roko', 'hablar con roko', 'abrir chat', 'ir al chat', 'abrir roko', 'preguntar a roko', 'ayuda de roko', 'roko chat', 'hablar con el bot', 'hola roko', 'dime roko'], command: 'chat', data: 'open' },
  
  // Quick Actions without params
  { patterns: ['ayuda', 'qué comandos hay', 'comandos de voz', 'qué puedo decir', 'cómo funciona', 'instrucciones de voz'], command: 'help', data: 'show' },
  { patterns: ['nueva restricción', 'crear restricción', 'anotar alergia', 'añadir restricción', 'añadir alergia'], command: 'add', data: 'restriction' },
  { patterns: ['nuevo alimento', 'crear alimento', 'anotar comida', 'añadir alimento', 'añadir comida'], command: 'add', data: 'food' },
  
  // Contextual Selection
  { patterns: ['desayuno', 'para desayunar', 'hora del desayuno', 'poner desayuno'], command: 'mealType', data: 'desayuno' },
  { patterns: ['almuerzo', 'comida', 'para almorzar', 'para comer', 'poner almuerzo', 'poner comida'], command: 'mealType', data: 'almuerzo' },
  { patterns: ['cena', 'cenar', 'para cenar', 'poner cena'], command: 'mealType', data: 'cena' },
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
  
  // 1. Check specific command patterns first (Navigation, Actions, etc.)
  for (const { patterns, command, data } of COMMAND_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern instanceof RegExp) {
        const match = text.match(pattern);
        if (match) {
          const capturedData = match[1] || data;
          onCommand(command, capturedData);
          return;
        }
      } else if (text.includes(pattern as string) || text === pattern) {
        onCommand(command, data);
        return;
      }
    }
  }
  
  // 2. If no pattern matched, check for conversational intent
  const questionKeywords = ['qué', 'que', 'cómo', 'como', 'por qué', 'porque', 'cuál', 'cual', 'dónde', 'donde', 'ayuda', 'roko', 'cuéntame', 'puedo', 'debo', 'es seguro', 'recomienda', 'dime', 'explica'];
  const isQuestion = questionKeywords.some(kw => text.includes(kw));
  
  // Only trigger AI query if it's a clear question or a very long conversational string
  // and NOT simply a failed navigation attempt
  const isConversational = isQuestion || text.split(' ').length > 6;

  if (isConversational) {
    onCommand('ai_query', transcript);
  } else {
    // Unrecognized but not a clear conversational query
    onCommand('unrecognized', transcript);
  }
}

// Add type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
