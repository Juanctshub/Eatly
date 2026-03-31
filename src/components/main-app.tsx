'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import RokoChat from '@/components/shared/RokoChat';
import OnboardingRoko from '@/components/shared/OnboardingRoko';
import RokoPage from '@/components/shared/RokoPage';
import AIChatSection from '@/components/shared/AIChatSection';
import RestaurantMap from '@/components/shared/RestaurantMap';
import BarcodeScanner from '@/components/shared/BarcodeScanner';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import {
  Home as HomeIcon,
  Apple,
  Lightbulb,
  Plus,
  AlertTriangle,
  Trash2,
  ChefHat,
  Utensils,
  Sparkles,
  X,
  Check,
  Shield,
  Heart,
  Zap,
  Leaf,
  Clock,
  Flame,
  Settings,
  LogOut,
  User,
  ChevronRight,
  Search,
  Star,
  TrendingUp,
  Bell,
  Palette,
  Key,
  UserX,
  Target,
  Moon,
  Sun,
  Volume2,
  Vibrate,
  Lock,
  Eye,
  Camera,
  Mail,
  Phone,
  Edit3,
  ArrowLeft,
  ChevronDown,
  RefreshCw,
  Info,
  MessageCircle,
  Mic,
  MapPin,
  AlertCircle,
} from 'lucide-react';

// Types
interface Restriction {
  id: string;
  foodItem: string;
  reason: string;
  severity: string;
  category?: string; // NEW: AI-generated category
  notes?: string;
  createdAt: string;
}

interface Food {
  id: string;
  name: string;
  category?: string;
  mealType?: string;
  createdAt: string;
}

interface Suggestion {
  name: string;
  ingredients: string[];
  safetyReason: string;
  nutritionalBenefits: string;
  prepTime?: number;
  calories?: number;
  imageEmoji?: string;
}

// Dynamic suggestions are generated via /api/suggestions (Z-AI SDK)

// Preloaded common restrictions
const commonRestrictions = [
  { foodItem: 'Soya', reason: 'alergia', severity: 'severa' },
  { foodItem: 'Pimienta negra', reason: 'alergia', severity: 'moderada' },
  { foodItem: 'Gluten', reason: 'intolerancia', severity: 'moderada' },
  { foodItem: 'Lactosa', reason: 'intolerancia', severity: 'leve' },
  { foodItem: 'Mariscos', reason: 'alergia', severity: 'severa' },
  { foodItem: 'Nueces', reason: 'alergia', severity: 'severa' },
];

// Navigation tabs
const tabs = [
  { id: 'home', label: 'Inicio', icon: HomeIcon },
  { id: 'restrictions', label: 'Restricciones', icon: AlertTriangle },
  { id: 'add', label: '', icon: Plus },
  { id: 'foods', label: 'Comidas', icon: Utensils },
  { id: 'roko', label: 'Roko', icon: Sparkles },
];

const mealTypes = [
  { id: 'desayuno', label: 'Desayuno', emoji: '🌅', time: '7:00 - 10:00' },
  { id: 'almuerzo', label: 'Almuerzo', emoji: '☀️', time: '12:00 - 15:00' },
  { id: 'cena', label: 'Cena', emoji: '🌙', time: '19:00 - 22:00' },
];

const reasonOptions = [
  { id: 'alergia', label: 'Alergia', icon: '🔴', color: 'from-red-400 to-rose-500' },
  { id: 'intolerancia', label: 'Intolerancia', icon: '🟠', color: 'from-orange-400 to-amber-500' },
  { id: 'diabetes', label: 'Diabetes', icon: '🔵', color: 'from-blue-400 to-indigo-500' },
  { id: 'hipertension', label: 'Hipertensión', icon: '🟣', color: 'from-purple-400 to-violet-500' },
  { id: 'otro', label: 'Otro', icon: '⚪', color: 'from-gray-400 to-slate-500' },
];

const severityOptions = [
  { id: 'leve', label: 'Leve', color: 'from-emerald-400 to-green-500' },
  { id: 'moderada', label: 'Moderada', color: 'from-amber-400 to-orange-500' },
  { id: 'severa', label: 'Severa', color: 'from-red-400 to-rose-500' },
];

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function EatlyApp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, toggleTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [suggestions, setSuggestions] = useState<{ suggestions: Suggestion[]; generalTip: string } | null>(null);
  const [selectedMealType, setSelectedMealType] = useState('almuerzo');
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [addType, setAddType] = useState<'restriction' | 'food'>('restriction');
  const [showSettings, setShowSettings] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showRokoSection, setShowRokoSection] = useState(false);
  const [showRestaurantMap, setShowRestaurantMap] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  const [voiceInitialMessage, setVoiceInitialMessage] = useState<string | undefined>(undefined);
  const [showActivityHistory, setShowActivityHistory] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [settingsSection, setSettingsSection] = useState<string | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceCommandFeedback, setVoiceCommandFeedback] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    reminders: true,
    tips: false,
  });
  const [userData, setUserData] = useState({
    name: 'Usuario',
    email: 'usuario@email.com',
    phone: '+52 123 456 7890',
    goal: 'Bajar de peso',
    activityLevel: 'Moderado',
    recentLogs: 'He comido sano hoy',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Permission states
  const [permissions, setPermissions] = useState({
    camera: { granted: false, loading: false },
    notifications: { granted: false, loading: false },
    location: { granted: false, loading: false },
    microphone: { granted: false, loading: false },
  });

  // Sound and vibration settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Form states
  const [newRestriction, setNewRestriction] = useState({
    foodItem: '',
    reason: 'alergia',
    severity: 'moderada',
    notes: '',
  });
  const [newFood, setNewFood] = useState({
    name: '',
    category: '',
    mealType: '',
  });

  // Handle URL actions (Deep linking support)
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'chat') {
      setShowRokoSection(true);
    } else if (action === 'restaurants') {
      setShowRestaurantMap(true);
    } else if (action === 'scan') {
      setShowScanner(true);
    }
  }, [searchParams]);

  // Initial data loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const headers = { 'x-user-email': JSON.parse(localStorage.getItem('dietadvisor_user') || '{}').email, 'Content-Type': 'application/json' };
        const [resRest, resFood, resOnboarding] = await Promise.all([
          fetch('/api/restrictions', { headers }),
          fetch('/api/foods', { headers }),
          fetch('/api/user/onboarding', { headers })
        ]);
        
        const dataRest = await resRest.json();
        const dataFood = await resFood.json();
        const dataOnboarding = await resOnboarding.json();
        
        if (!dataOnboarding.onboarding) {
          setShowOnboarding(true);
        }

        if (dataOnboarding.user) {
          console.log('[Eatly] Cargando perfil del usuario:', dataOnboarding.user.name);
          setUserData(prev => ({
            ...prev,
            ...dataOnboarding.user
          }));
        }

        if (Array.isArray(dataRest)) {
          setRestrictions(dataRest);
        }
        if (Array.isArray(dataFood)) {
          setFoods(dataFood);
        }
      } catch (error: any) {
        console.error('Error fetching data from API:', error);
        setErrorToast('Error de conexión con Roko: No se pudieron cargar tus datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshAllData = async () => {
    try {
      console.log('[Eatly] Refrescando datos omniscientes...');
      const [resRest, resFood, resOnboarding] = await Promise.all([
        fetch('/api/restrictions'),
        fetch('/api/foods'),
        fetch('/api/user/onboarding')
      ]);
      
      const dataRest = await resRest.json();
      const dataFood = await resFood.json();
      const dataOnboarding = await resOnboarding.json();
      
      if (dataOnboarding.user) {
        setUserData(prev => ({ ...prev, ...dataOnboarding.user }));
      }
      if (Array.isArray(dataRest)) setRestrictions(dataRest);
      if (Array.isArray(dataFood)) setFoods(dataFood);
      
      console.log('[Eatly] Datos refrescados con éxito.');
    } catch (err: any) {
      console.error('Error refreshing data:', err);
      setErrorToast('Error crítico al sincronizar con el servidor.');
    }
  };

  // Sync state changes with local storage as a cache
  useEffect(() => {
    localStorage.setItem('eatly_restrictions', JSON.stringify(restrictions));
  }, [restrictions]);

  useEffect(() => {
    localStorage.setItem('eatly_foods', JSON.stringify(foods));
  }, [foods]);

  const handleTabChange = (tabId: string) => {
    if (tabId === 'add') {
      setActiveTab('home');
      setShowAddModal(true);
      setAddType('food');
      return;
    }
    setActiveTab(tabId);
  };

  const handleOnboardingComplete = async (data: any) => {
    try {
      setLoading(true);
      console.log('[Eatly] Onboarding completado:', data);
      
      const user = JSON.parse(localStorage.getItem('dietadvisor_user') || '{}');
      const email = user.email;

      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-email': email
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el onboarding');
      }

      setShowOnboarding(false);
      await refreshAllData();
      playSound('success');
    } catch (error) {
      console.error('Error in onboarding:', error);
      setErrorToast('No se pudo guardar tu perfil. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const addRestriction = async () => {
    if (!newRestriction.foodItem.trim()) return;

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('dietadvisor_user') || '{}');
      const email = user.email;

      const response = await fetch('/api/restrictions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-email': email
        },
        body: JSON.stringify(newRestriction),
      });

      if (!response.ok) throw new Error('Error al guardar');

      const saved = await response.json();
      setRestrictions([saved, ...restrictions]);
      setNewRestriction({ foodItem: '', reason: 'alergia', severity: 'moderada', notes: '' });
      setShowAddModal(false);
      playSound('success');
      vibrate(50);
    } catch (error) {
      setErrorToast('Error al guardar restricción');
    } finally {
      setLoading(false);
    }
  };

  const addQuickRestriction = async (cr: any) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('dietadvisor_user') || '{}');
      const res = await fetch('/api/restrictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-email': user.email },
        body: JSON.stringify(cr),
      });
      const data = await res.json();
      
      if (data.id) {
        setRestrictions([data, ...restrictions]);
        playSound('success');
        vibrate(50);
      }
    } catch (error) {
      console.error('Error in quick add:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRestriction = async (id: string) => {
    try {
      const user = JSON.parse(localStorage.getItem('dietadvisor_user') || '{}');
      await fetch(`/api/restrictions/${id}`, { 
        method: 'DELETE',
        headers: { 'x-user-email': user.email }
      });
      setRestrictions(restrictions.filter((r) => r.id !== id));
      playSound('click');
    } catch (error) {
      console.error('Error deleting restriction:', error);
    }
  };

  const addFood = async () => {
    if (!newFood.name.trim()) return;

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('dietadvisor_user') || '{}');
      const email = user.email;
      let category = newFood.category;

      // AI Categorization if empty
      if (!category) {
        console.log('[AI] Categorizando alimento:', newFood.name);
        try {
          const res = await fetch('/api/ai/categorize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-user-email': email },
            body: JSON.stringify({ foodName: newFood.name }),
          });
          const data = await res.json();
          if (data.success) {
            category = data.category;
          }
        } catch (err) {
          console.warn('AI Categorization failed, using default');
        }
      }

      // Save to database
      const response = await fetch('/api/foods', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-email': email
        },
        body: JSON.stringify({
          name: newFood.name,
          category: category || 'General',
          mealType: selectedMealType
        }),
      });

      if (!response.ok) throw new Error('Error al guardar');

      const dataFinal = await response.json();

      if (dataFinal.id) {
        setFoods([dataFinal, ...foods]);
        setNewFood({ name: '', category: '', mealType: '' });
        setShowAddModal(false);
        playSound('success');
        vibrate([50, 100]);
      }
    } catch (error) {
      setErrorToast('Error al guardar alimento');
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id: string) => {
    try {
      await fetch(`/api/foods/${id}`, { method: 'DELETE' });
      setFoods(foods.filter((f) => f.id !== id));
      playSound('click');
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  const generateSuggestions = async () => {
    setLoading(true);
    try {
      const foodsForMeal = foods.filter((f) => f.mealType === selectedMealType || !f.mealType);
      
      // Fetch real Z-AI suggestions
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealType: selectedMealType,
          availableFoods: foodsForMeal.length > 0 ? foodsForMeal : foods,
          restrictions,
        }),
      });
      
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      setSuggestions({
        suggestions: [],
        generalTip: 'Tuvimos un problema con el generador local de sugerencias.',
      });
    }
    setLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem('dietadvisor_user');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    try {
      console.log('Deleting local account...');
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  // Real permission handlers
  const requestPermission = useCallback(async (type: 'camera' | 'notifications' | 'location' | 'microphone') => {
    setPermissions(prev => ({ ...prev, [type]: { ...prev[type], loading: true } }));
    
    try {
      let granted = false;
      
      switch (type) {
        case 'camera':
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            granted = true;
          } catch {
            granted = false;
          }
          break;
          
        case 'microphone':
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            granted = true;
          } catch {
            granted = false;
          }
          break;
          
        case 'location':
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
            });
            granted = !!position;
          } catch {
            granted = false;
          }
          break;
          
        case 'notifications':
          if ('Notification' in window) {
            const result = await Notification.requestPermission();
            granted = result === 'granted';
            // Update notifications state if granted
            if (granted) {
              setNotifications(prev => ({ ...prev, push: true }));
            }
          }
          break;
      }
      
      setPermissions(prev => ({ ...prev, [type]: { granted, loading: false } }));
    } catch (error) {
      console.error(`Error requesting ${type} permission:`, error);
      setPermissions(prev => ({ ...prev, [type]: { granted: false, loading: false } }));
    }
  }, []);

  // Check existing permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      // Check notification permission
      if ('Notification' in window) {
        const notificationPermission = Notification.permission === 'granted';
        setPermissions(prev => ({ 
          ...prev, 
          notifications: { granted: notificationPermission, loading: false } 
        }));
      }
      
      // Check camera and microphone permissions
      if (navigator.permissions) {
        try {
          const cameraStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
          setPermissions(prev => ({ 
            ...prev, 
            camera: { granted: cameraStatus.state === 'granted', loading: false } 
          }));
          
          const micStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          setPermissions(prev => ({ 
            ...prev, 
            microphone: { granted: micStatus.state === 'granted', loading: false } 
          }));
          
          const geoStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          setPermissions(prev => ({ 
            ...prev, 
            location: { granted: geoStatus.state === 'granted', loading: false } 
          }));
        } catch {
          // Permissions API not fully supported
        }
      }
    };
    
    checkPermissions();
  }, []);

  // Play sound feedback
  const playSound = useCallback((type: 'success' | 'error' | 'click' = 'click') => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = type === 'success' ? 800 : type === 'error' ? 300 : 600;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [soundEnabled]);

  // Vibration feedback
  const vibrate = useCallback((pattern: number | number[] = 50) => {
    if (!vibrationEnabled || !navigator.vibrate) return;
    navigator.vibrate(pattern);
  }, [vibrationEnabled]);

  const getReasonInfo = (reason: string) => {
    return reasonOptions.find((r) => r.id === reason) || reasonOptions[4];
  };

  const getSeverityInfo = (severity: string) => {
    return severityOptions.find((s) => s.id === severity) || severityOptions[1];
  };

  // Get current time meal suggestion
  const getCurrentMealType = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 7 && hour < 11) return 'desayuno';
    if (hour >= 11 && hour < 16) return 'almuerzo';
    return 'cena';
  }, []);

  // Voice commands handler
  const handleVoiceCommand = useCallback((command: string, data: string) => {
    playSound('success');
    vibrate([30, 50, 30]);
    setVoiceError(null);
    
    // Feedback mapping
    const feedbackMap: Record<string, string> = {
      'navigate': 'Navegando...',
      'restaurants': 'Buscando restaurantes...',
      'add_restriction': 'Nueva restricción: ' + data,
      'add_food': 'Nuevo alimento: ' + data,
      'chat': 'Abriendo Roko Chat...',
      'scan': 'Activando Escáner...',
      'settings': 'Abriendo Configuración...',
      'mealType': 'Cambiando a ' + data,
      'help': 'Buscando ayuda...',
      'ai_query': 'Preguntando a Roko...'
    };

    setVoiceCommandFeedback(feedbackMap[command] || 'Entendido');
    setTimeout(() => setVoiceCommandFeedback(null), 2500);

    // Navigation logic: Close all overlays first to avoid "same site" confusion
    const resetOverlays = () => {
      setShowSettings(false);
      setShowAddModal(false);
      setShowRestaurantMap(false);
      setShowScanner(false);
      setShowRokoSection(false);
    };
    
    switch (command) {
      case 'navigate':
        resetOverlays();
        setActiveTab(data);
        break;
      case 'restaurants':
        resetOverlays();
        setShowRestaurantMap(true);
        break;
      case 'add':
        setAddType(data as 'restriction' | 'food');
        setShowAddModal(true);
        break;
      case 'add_restriction':
        resetOverlays();
        setNewRestriction(prev => ({ ...prev, foodItem: data }));
        setAddType('restriction');
        setShowAddModal(true);
        break;
      case 'add_food':
        resetOverlays();
        setNewFood(prev => ({ ...prev, name: data }));
        setAddType('food');
        setShowAddModal(true);
        break;
      case 'chat':
        resetOverlays();
        setShowRokoSection(true);
        break;
      case 'settings':
        resetOverlays();
        setShowSettings(true);
        break;
      case 'mealType':
        setSelectedMealType(data);
        if (activeTab !== 'suggestions') {
          resetOverlays();
          setActiveTab('suggestions');
        }
        break;
      case 'scan':
        resetOverlays();
        setShowScanner(true);
        break;
      case 'help':
        resetOverlays();
        setVoiceInitialMessage('¿Qué comandos de voz puedo usar?');
        setShowRokoSection(true);
        break;
      case 'ai_query':
        resetOverlays();
        setVoiceInitialMessage(data);
        setShowRokoSection(true);
        break;
      default:
        resetOverlays();
        setVoiceInitialMessage(data);
        setShowRokoSection(true);
    }
  }, [playSound, vibrate, activeTab]);

  // Initialize voice commands
  const {
    isListening,
    transcript,
    error: voiceCmdError,
    isSupported: voiceSupported,
    startListening,
    stopListening,
  } = useVoiceCommands({
    onCommand: handleVoiceCommand,
    language: 'es-ES',
  });

  // Update voice error state
  useEffect(() => {
    if (voiceCmdError) {
      setVoiceError(voiceCmdError);
    }
  }, [voiceCmdError]);

  // Render Home
  const renderHome = () => (
    <motion.div
      className="space-y-5"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {/* Header with elegant gradient */}
      <div className="relative -mx-4 px-4 pt-8 pb-6 bg-background">
        {/* Decorative circles - subtler for dark mode */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute top-10 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl opacity-20 pointer-events-none" />
        
        <motion.div
          className="flex items-center justify-between mb-6 relative z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-green-600 dark:text-green-400 text-sm font-semibold tracking-wide">Bienvenido de nuevo</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">¿Qué quieres comer hoy?</h1>
          </div>
          <motion.button
            onClick={() => setShowSettings(true)}
            className="w-12 h-12 bg-card backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg shadow-black/5 border border-border"
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 text-foreground" />
          </motion.button>
        </motion.div>

        {/* Hero Card - Current Meal Suggestion */}
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          variants={cardVariants}
          initial="initial"
          animate="animate"
        >
          {/* Gradient background with pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.1),transparent_50%)]" />
          
          {/* Animated decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
          
          {/* Content */}
          <div className="relative z-10 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-xl">{mealTypes.find((m) => m.id === getCurrentMealType)?.emoji}</span>
              </div>
              <span className="text-sm font-semibold text-white/90">
                Hora de {mealTypes.find((m) => m.id === getCurrentMealType)?.label}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
              {suggestions?.suggestions?.[0]?.name || 'Planifica tu comida'}
            </h2>
            <p className="text-sm text-white/80 mb-5 leading-relaxed">
              {suggestions?.suggestions?.[0]?.safetyReason || 'Genera opciones 100% compatibles con tus restricciones'}
            </p>
            
            <motion.button
              onClick={() => {
                setSelectedMealType(getCurrentMealType);
                setActiveTab('suggestions');
                playSound('click');
                vibrate(30);
              }}
              className="bg-white text-green-600 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-black/10"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              Ver sugerencias
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats - Card Style */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="bg-card rounded-3xl p-5 shadow-sm border border-border relative overflow-hidden"
          variants={staggerItem}
          whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25 mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{restrictions.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Restricciones activas</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-3xl p-5 shadow-sm border border-border relative overflow-hidden"
          variants={staggerItem}
          whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 mb-3">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{foods.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Alimentos disponibles</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Suggested for you */}
      <motion.div variants={staggerItem}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sugerido para ti</h2>
          <motion.button
            onClick={() => setActiveTab('suggestions')}
            className="text-sm text-green-600 dark:text-green-400 font-semibold flex items-center gap-1"
            whileHover={{ x: 3 }}
          >
            Ver todas
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {(suggestions?.suggestions || [])
            .slice(0, 5)
            .map((suggestion: any, index: number) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-40 bg-white dark:bg-gray-800 rounded-3xl p-4 shadow-sm border border-gray-100/80 dark:border-gray-700"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
              >
                <div className="text-4xl mb-3">{suggestion.imageEmoji}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 leading-tight">{suggestion.name}</h3>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {suggestion.prepTime} min
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Quick Actions - Refined Style */}
      <motion.div className="space-y-3" variants={staggerContainer}>
        <motion.button
          onClick={() => {
            setAddType('restriction');
            setShowAddModal(true);
            playSound('click');
            vibrate(30);
          }}
          className="w-full bg-card rounded-3xl p-5 shadow-sm border border-border flex items-center gap-4 relative overflow-hidden group"
          variants={staggerItem}
          whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 dark:from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25 relative z-10">
            <AlertTriangle className="w-7 h-7 text-white" />
          </div>
          <div className="text-left flex-1 relative z-10">
            <p className="font-semibold text-gray-900 dark:text-white text-lg">Agregar restricción</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Registra alimentos que no puedes comer</p>
          </div>
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors relative z-10">
            <Plus className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-red-500 transition-colors" />
          </div>
        </motion.button>

        <motion.button
          onClick={() => {
            setAddType('food');
            setShowAddModal(true);
            playSound('click');
            vibrate(30);
          }}
          className="w-full bg-card rounded-3xl p-5 shadow-sm border border-border flex items-center gap-4 relative overflow-hidden group"
          variants={staggerItem}
          whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 dark:from-green-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 relative z-10">
            <Utensils className="w-7 h-7 text-white" />
          </div>
          <div className="text-left flex-1 relative z-10">
            <p className="font-semibold text-gray-900 dark:text-white text-lg">Agregar alimento</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">¿Qué tienes disponible para comer?</p>
          </div>
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors relative z-10">
            <Plus className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
          </div>
        </motion.button>
      </motion.div>

      {/* Restaurant Map Card */}
      <motion.button
        onClick={() => {
          setShowRestaurantMap(true);
          playSound('click');
          vibrate(30);
        }}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-5 shadow-lg shadow-orange-500/25 flex items-center gap-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center relative z-10">
          <MapPin className="w-7 h-7 text-white" />
        </div>
        <div className="text-left flex-1 relative z-10">
          <p className="font-semibold text-white text-lg">Restaurantes Cercanos</p>
          <p className="text-sm text-white/80">Encuentra lugares seguros para comer</p>
        </div>
        <ChevronRight className="w-6 h-6 text-white/70 relative z-10" />
      </motion.button>

      {/* Scanner Card */}
      <motion.button
        onClick={() => {
          setShowScanner(true);
          playSound('click');
          vibrate(30);
        }}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-5 shadow-lg shadow-blue-500/25 flex items-center gap-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center relative z-10">
          <Camera className="w-7 h-7 text-white" />
        </div>
        <div className="text-left flex-1 relative z-10">
          <p className="font-semibold text-white text-lg">Escanear Producto</p>
          <p className="text-sm text-white/80">Verifica si es seguro para ti</p>
        </div>
        <ChevronRight className="w-6 h-6 text-white/70 relative z-10" />
      </motion.button>

      {/* Active Restrictions */}
      {restrictions.length > 0 && (
        <motion.div
          className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100/80"
          variants={staggerItem}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-500" />
              </div>
              <h2 className="font-bold text-gray-900">Tus restricciones</h2>
            </div>
            <motion.button 
              onClick={() => setActiveTab('restrictions')} 
              className="text-sm text-green-600 font-semibold"
              whileHover={{ x: 2 }}
            >
              Ver todas
            </motion.button>
          </div>
          <div className="flex flex-wrap gap-2">
            {restrictions.slice(0, 4).map((r) => {
              const reasonInfo = getReasonInfo(r.reason);
              return (
                <motion.span
                  key={r.id}
                  className="px-4 py-2 bg-gradient-to-r from-red-50 to-rose-50 text-red-600 rounded-full text-sm font-semibold border border-red-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {reasonInfo.icon} {r.foodItem}
                </motion.span>
              );
            })}
            {restrictions.length > 4 && (
              <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-full text-sm font-semibold">
                +{restrictions.length - 4} más
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  // Render Restrictions
  const renderRestrictions = () => (
    <motion.div
      className="space-y-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="flex items-center justify-between pt-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Restricciones</h1>
          <p className="text-muted-foreground text-sm mt-1">{restrictions.length} alimentos registrados</p>
        </div>
        <motion.button
          onClick={() => {
            setAddType('restriction');
            setShowAddModal(true);
          }}
          className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>

      {/* Quick Add Common */}
      <motion.div
        className="bg-amber-500/10 rounded-3xl p-4 border border-amber-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm font-semibold text-amber-500 mb-3">Agregar rápidamente</p>
        <div className="flex flex-wrap gap-2">
          {commonRestrictions.slice(0, 4).map((cr) => (
            <motion.button
              key={cr.foodItem}
              onClick={() => addQuickRestriction(cr)}
              className="px-3 py-1.5 bg-card rounded-full text-sm font-medium text-foreground shadow-sm hover:shadow-md transition-all border border-border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + {cr.foodItem}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {restrictions.length === 0 ? (
        <motion.div
          className="bg-card rounded-3xl p-10 shadow-sm border border-border text-center mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-5"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
          <p className="text-foreground font-bold text-xl">¡Sin restricciones!</p>
          <p className="text-muted-foreground text-sm mt-2 mb-6">No tienes restricciones registradas aún</p>
          <motion.button
            onClick={() => {
              setAddType('restriction');
              setShowAddModal(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Agregar primera restricción
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-3 mt-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence>
            {restrictions.map((restriction) => {
              const reasonInfo = getReasonInfo(restriction.reason);
              const severityInfo = getSeverityInfo(restriction.severity);
              return (
                <motion.div
                  key={restriction.id}
                  className="bg-card rounded-3xl p-5 shadow-sm border border-border"
                  variants={staggerItem}
                  layout
                  exit={{ opacity: 0, x: -100 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${reasonInfo.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <span className="text-xl">{reasonInfo.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-xl">{restriction.foodItem}</h3>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 bg-muted text-foreground rounded-xl text-xs font-semibold">
                          {reasonInfo.label}
                        </span>
                        <span
                          className={`px-3 py-1.5 bg-gradient-to-r ${severityInfo.color} text-white rounded-xl text-xs font-semibold shadow-sm`}
                        >
                          {severityInfo.label}
                        </span>
                        {restriction.category && (
                          <span className="px-3 py-1.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl text-xs font-bold border border-violet-500/20">
                            ✨ {restriction.category}
                          </span>
                        )}
                      </div>
                      {restriction.notes && (
                        <p className="text-sm text-muted-foreground mt-3 bg-muted rounded-xl p-3">
                          {restriction.notes}
                        </p>
                      )}
                    </div>
                    <motion.button
                      onClick={() => deleteRestriction(restriction.id)}
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );

  // Render Foods
  const renderFoods = () => (
    <motion.div
      className="space-y-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="flex items-center justify-between pt-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alimentos</h1>
          <p className="text-muted-foreground text-sm mt-1">{foods.length} alimentos disponibles</p>
        </div>
        <motion.button
          onClick={() => {
            setAddType('food');
            setShowAddModal(true);
          }}
          className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>

      {/* Meal Type Filter */}
      <motion.div
        className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => setSelectedMealType('')}
          className={`px-5 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all ${
            selectedMealType === ''
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
              : 'bg-card text-muted-foreground border border-border'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Todos
        </motion.button>
        {mealTypes.map((meal) => (
          <motion.button
            key={meal.id}
            onClick={() => setSelectedMealType(meal.id)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all ${
              selectedMealType === meal.id
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                : 'bg-card text-muted-foreground border border-border'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {meal.emoji} {meal.label}
          </motion.button>
        ))}
      </motion.div>

      {foods.length === 0 ? (
        <motion.div
          className="bg-card rounded-3xl p-10 shadow-sm border border-border text-center mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-5"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Apple className="w-10 h-10 text-green-500" />
          </motion.div>
          <p className="text-foreground font-bold text-xl">Sin alimentos</p>
          <p className="text-muted-foreground text-sm mt-2 mb-6">Agrega alimentos disponibles para recibir sugerencias</p>
          <motion.button
            onClick={() => {
              setAddType('food');
              setShowAddModal(true);
            }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Agregar primer alimento
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-2 gap-3 mt-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence>
            {foods
              .filter((f) => !selectedMealType || f.mealType === selectedMealType)
              .map((food) => (
                <motion.div
                  key={food.id}
                  className="bg-card rounded-3xl p-4 shadow-sm border border-border relative group"
                  variants={staggerItem}
                  layout
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -3 }}
                >
                  <motion.button
                    onClick={() => deleteFood(food.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-50 text-red-400 hover:text-red-500 hover:bg-red-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-3 border border-green-200/50">
                    <ChefHat className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base">{food.name}</h3>
                  {food.category && <p className="text-xs text-muted-foreground mt-1">{food.category}</p>}
                  {food.mealType && (
                    <span className="inline-block mt-3 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-semibold border border-green-500/20">
                      {mealTypes.find((m) => m.id === food.mealType)?.emoji}{' '}
                      {mealTypes.find((m) => m.id === food.mealType)?.label}
                    </span>
                  )}
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );

  // Render Suggestions
  const renderSuggestions = () => (
    <motion.div
      className="space-y-4"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="pt-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Sugerencias</h1>
        <p className="text-muted-foreground text-sm mt-1">Recomendaciones personalizadas con IA</p>
      </motion.div>

      {/* Meal Type Selector */}
      <motion.div
        className="bg-card rounded-3xl p-5 shadow-sm border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-amber-500" />
          <h2 className="text-sm font-semibold text-muted-foreground">Selecciona el tipo de comida</h2>
        </div>
        <div className="flex gap-3">
          {mealTypes.map((meal) => (
            <motion.button
              key={meal.id}
              onClick={() => setSelectedMealType(meal.id)}
              className={`flex-1 py-4 px-3 rounded-2xl text-sm font-medium transition-all ${
                selectedMealType === meal.id
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/40'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-2xl block mb-2">{meal.emoji}</span>
              <p className="font-semibold">{meal.label}</p>
              <p className={`text-xs mt-1 ${selectedMealType === meal.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                {meal.time}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.button
        onClick={generateSuggestions}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 bg-size-200 text-white py-5 rounded-3xl font-semibold shadow-xl shadow-green-500/30 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3 hover:bg-right transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <>
            <motion.div
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Generando sugerencias...
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            Generar sugerencias con IA
          </>
        )}
      </motion.button>

      {/* AI Chat Button */}
      <motion.button
        onClick={() => setShowAIChat(true)}
        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-5 rounded-3xl font-semibold shadow-xl shadow-violet-500/30 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="w-6 h-6" />
        Chatea con Roko tu Nutriólogo
        <span className="bg-white/20 text-xs px-2 py-1 rounded-full">IA</span>
      </motion.button>

      {/* Empty State / Call to Action */}
      {!suggestions && (
        <motion.div
           className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center mt-6"
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Descubre tu menú ideal
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Roko analizará tus alimentos y restricciones para crear sugerencias 100% seguras y deliciosas.
          </p>
          <motion.button
            onClick={generateSuggestions}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg shadow-green-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Generando con IA...' : 'Generar ideas ahora'}
          </motion.button>
        </motion.div>
      )}

      {/* AI Generated Suggestions */}
      <AnimatePresence>
        {suggestions && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {suggestions.generalTip && (
              <motion.div
                className="bg-green-500/10 rounded-3xl p-5 border border-green-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-green-500">Consejo del día</p>
                </div>
                <p className="text-green-500/80 text-sm leading-relaxed">{suggestions.generalTip}</p>
              </motion.div>
            )}

            {suggestions.suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-3xl p-5 shadow-sm border border-border"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-green-500/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 + index * 0.1 }}
                  >
                    <span className="text-3xl">{suggestion.imageEmoji || '🍽️'}</span>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-xl">{suggestion.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      {suggestion.prepTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {suggestion.prepTime} min
                        </span>
                      )}
                      {suggestion.calories && (
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {suggestion.calories} kcal
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Ingredientes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.ingredients.map((ing, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1.5 bg-muted text-foreground rounded-xl text-sm font-medium border border-border"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        {ing}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <p className="text-xs font-semibold text-green-500 uppercase tracking-wider">
                      ¿Por qué es seguro?
                    </p>
                  </div>
                  <p className="text-sm text-green-500/80 leading-relaxed">{suggestion.safetyReason}</p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Beneficios nutricionales
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.nutritionalBenefits}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Add Modal
  const renderAddModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowAddModal(false)}
    >
      <motion.div
        className="bg-card rounded-t-[2rem] w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto border-t border-border shadow-2xl"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full mx-auto mb-6" />

        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
              addType === 'restriction'
                ? 'bg-gradient-to-br from-red-400 to-rose-500 shadow-red-500/20'
                : 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-green-500/20'
            }`}
          >
            {addType === 'restriction' ? (
              <AlertTriangle className="w-7 h-7 text-white" />
            ) : (
              <Utensils className="w-7 h-7 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {addType === 'restriction' ? 'Nueva restricción' : 'Nuevo alimento'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {addType === 'restriction' ? 'Registra un alimento a evitar' : 'Agrega un alimento disponible'}
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {addType === 'restriction' ? (
            <motion.div
              key="restriction-form"
              className="space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">Alimento</label>
                <input
                  type="text"
                  value={newRestriction.foodItem}
                  onChange={(e) => setNewRestriction({ ...newRestriction, foodItem: e.target.value })}
                  placeholder="Ej: Soya, Pimienta, Lactosa..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-muted focus:border-green-500 focus:ring-0 outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Razón</label>
                <div className="grid grid-cols-2 gap-2">
                  {reasonOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setNewRestriction({ ...newRestriction, reason: option.id })}
                      className={`p-4 rounded-2xl text-left transition-all border-2 ${
                        newRestriction.reason === option.id
                          ? 'bg-green-500/10 border-green-500'
                          : 'bg-muted border-transparent hover:bg-muted/80'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xl">{option.icon}</span>
                      <p className="font-semibold text-foreground mt-1">{option.label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Severidad</label>
                <div className="flex gap-2">
                  {severityOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => setNewRestriction({ ...newRestriction, severity: option.id })}
                      className={`flex-1 py-4 rounded-2xl text-sm font-semibold transition-all ${
                        newRestriction.severity === option.id
                          ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                          : 'bg-muted text-muted-foreground'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">
                  Notas adicionales (opcional)
                </label>
                <input
                  type="text"
                  value={newRestriction.notes}
                  onChange={(e) => setNewRestriction({ ...newRestriction, notes: e.target.value })}
                  placeholder="Ej: Reacción severa, consultar siempre..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-muted focus:border-green-500 focus:ring-0 outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <motion.button
                onClick={addRestriction}
                disabled={!newRestriction.foodItem.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Guardar restricción
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="food-form"
              className="space-y-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">Alimento</label>
                <input
                  type="text"
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                  placeholder="Ej: Pollo, Arroz, Brócoli..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-muted focus:border-green-500 focus:ring-0 outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">Categoría (opcional)</label>
                <input
                  type="text"
                  value={newFood.category}
                  onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                  placeholder="Ej: Proteína, Vegetal, Carbohidrato..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-border bg-muted focus:border-green-500 focus:ring-0 outline-none transition-colors text-foreground placeholder:text-muted-foreground/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-3">Tipo de comida</label>
                <div className="flex gap-2">
                  {mealTypes.map((meal) => (
                    <motion.button
                      key={meal.id}
                      onClick={() => setNewFood({ ...newFood, mealType: meal.id })}
                      className={`flex-1 py-4 rounded-2xl text-sm font-medium transition-all ${
                        newFood.mealType === meal.id
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                          : 'bg-muted text-muted-foreground'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xl block mb-1">{meal.emoji}</span>
                      {meal.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={addFood}
                disabled={!newFood.name.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Guardar alimento
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans overflow-hidden">
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingRoko 
            onComplete={handleOnboardingComplete} 
            isSubmitting={loading}
          />
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <div key="home" className="bg-background">{renderHome()}</div>}
          {activeTab === 'restrictions' && <div key="restrictions" className="bg-background">{renderRestrictions()}</div>}
          {activeTab === 'foods' && <div key="foods" className="bg-background">{renderFoods()}</div>}
          {activeTab === 'suggestions' && <div key="suggestions" className="bg-background">{renderSuggestions()}</div>}
          {activeTab === 'roko' && (
            <div key="roko" className="bg-background h-full">
              <RokoPage 
                restrictions={restrictions} 
                foods={foods} 
                mealType={selectedMealType} 
                userData={userData}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation - Exact Reference Style */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Floating Navigation Bar Container */}
        <div className="bg-card/90 backdrop-blur-xl rounded-[28px] shadow-lg shadow-black/10 border border-border px-4 py-3">
          {/* 5 Column Grid Layout */}
          <div className="grid grid-cols-5 items-center">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isCenter = index === 2;
              const isActive = activeTab === tab.id;

              if (isCenter) {
                return (
                  <motion.div
                    key={tab.id}
                    className="flex justify-center items-center"
                  >
                    <motion.button
                      onClick={() => handleTabChange(tab.id)}
                      className="relative -mt-12"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Elevated Center Button - Black/Green Style */}
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(34,197,94,0.4)] border-4 border-background">
                        <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
                      </div>
                    </motion.button>
                  </motion.div>
                );
              }

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className="flex flex-col items-center justify-center gap-1 py-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon Container - Circle with border */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 ${
                    isActive 
                      ? 'border-green-500 bg-green-500/10' 
                      : 'border-border bg-card'
                  }`}>
                    <Icon
                      className={`w-5 h-5 transition-all duration-200 ${
                        isActive ? 'text-green-500' : 'text-gray-500'
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  {/* Label */}
                  <span
                    className={`text-[11px] font-medium transition-all duration-200 ${
                      isActive ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Modal */}
      <AnimatePresence>{showAddModal && renderAddModal()}</AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-background rounded-t-[2rem] max-h-[90vh] overflow-y-auto border-t border-border shadow-2xl shadow-black/50"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-card z-10 px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={() => {
                      if (settingsSection) {
                        setSettingsSection(null);
                      } else {
                        setShowSettings(false);
                      }
                    }}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <h2 className="text-lg font-bold text-foreground">
                    {settingsSection === 'profile' ? 'Perfil' :
                     settingsSection === 'notifications' ? 'Notificaciones' :
                     settingsSection === 'personalization' ? 'Personalización' :
                     settingsSection === 'permissions' ? 'Permisos' : 'Configuración'}
                  </h2>
                  <div className="w-10" />
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                {!settingsSection ? (
                  // Main Settings Menu
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Profile Section */}
                    <motion.button
                      onClick={() => {
                        refreshAllData();
                        setSettingsSection('profile');
                      }}
                      className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 border border-border"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-foreground truncate max-w-[200px]">{userData.name || 'Cargando...'}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">{userData.email}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.button>

                    {/* Settings Options */}
                    {[
                      { id: 'notifications', icon: Bell, label: 'Notificaciones', color: 'from-blue-400 to-blue-500', desc: 'Configura tus alertas' },
                      { id: 'personalization', icon: Palette, label: 'Personalización', color: 'from-purple-400 to-purple-500', desc: 'Tema y apariencia' },
                      { id: 'permissions', icon: Key, label: 'Permisos', color: 'from-amber-400 to-amber-500', desc: 'Accesos de la app' },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => setSettingsSection(item.id)}
                        className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 border border-border shadow-sm"
                        whileHover={{ scale: 1.01, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </motion.button>
                    ))}

                    {/* Divider */}
                    <div className="h-px bg-gray-200 my-4" />

                    {/* Logout */}
                    <motion.button
                      onClick={handleLogout}
                      className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 border border-border shadow-sm"
                      whileHover={{ scale: 1.01, backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                        <LogOut className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-red-600">Cerrar Sesión</p>
                        <p className="text-sm text-gray-500">Salir de tu cuenta</p>
                      </div>
                    </motion.button>

                    {/* Delete Account */}
                    <motion.button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 border border-border shadow-sm"
                      whileHover={{ scale: 1.01, backgroundColor: 'rgba(239, 68, 68, 0.05)' }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                        <UserX className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-600">Eliminar Cuenta</p>
                        <p className="text-sm text-gray-500">Eliminar permanentemente</p>
                      </div>
                    </motion.button>
                  </motion.div>
                ) : settingsSection === 'profile' ? (
                  // Profile Section
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {/* Avatar */}
                    <div className="flex flex-col items-center py-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 mb-4">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <motion.button
                        className="px-4 py-2 bg-green-500/10 text-green-500 rounded-xl font-semibold text-sm border border-green-500/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cambiar foto
                      </motion.button>
                    </div>

                    {/* Profile Fields */}
                    {[
                      { icon: User, label: 'Nombre', value: userData.name, key: 'name' },
                      { icon: Mail, label: 'Email', value: userData.email, key: 'email' },
                      { icon: Target, label: 'Meta', value: userData.goal, key: 'goal' },
                      { icon: Zap, label: 'Actividad', value: userData.activityLevel, key: 'activityLevel' },
                      { icon: Edit3, label: 'Estado/Logs', value: userData.recentLogs, key: 'recentLogs' },
                    ].map((field) => (
                      <div key={field.key} className="bg-card rounded-2xl p-4 border border-border shadow-sm">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{field.label}</label>
                        <div className="flex items-center gap-3 mt-2">
                          <field.icon className="w-5 h-5 text-muted-foreground" />
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => setUserData({ ...userData, [field.key]: e.target.value })}
                            className="flex-1 text-foreground bg-transparent font-medium outline-none"
                          />
                          <Edit3 className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}

                    <motion.button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-green-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Guardar Cambios
                    </motion.button>
                  </motion.div>
                ) : settingsSection === 'notifications' ? (
                  // Notifications Section
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {[
                      { key: 'push', icon: Bell, label: 'Notificaciones Push', desc: 'Recibe alertas en tu dispositivo' },
                      { key: 'email', icon: Mail, label: 'Notificaciones Email', desc: 'Actualizaciones por correo' },
                      { key: 'reminders', icon: Clock, label: 'Recordatorios', desc: 'Recordatorios de comidas' },
                      { key: 'tips', icon: Lightbulb, label: 'Consejos Diarios', desc: 'Tips de nutrición' },
                    ].map((item) => (
                      <div key={item.key} className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <motion.button
                          className={`w-12 h-7 rounded-full p-1 transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="w-5 h-5 bg-white rounded-full shadow"
                            animate={{ x: notifications[item.key as keyof typeof notifications] ? 20 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </motion.button>
                      </div>
                    ))}
                  </motion.div>
                ) : settingsSection === 'personalization' ? (
                  // Personalization Section
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {/* Theme Selection */}
                    <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
                      <p className="font-semibold text-foreground mb-3">Tema de la App</p>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                            theme === 'light' ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-gray-200 dark:border-gray-600'
                          }`}
                          onClick={() => {
                            setTheme('light');
                            playSound('click');
                            vibrate(30);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Sun className="w-8 h-8 text-amber-500" />
                          <span className="font-medium text-foreground">Claro</span>
                        </motion.button>
                        <motion.button
                          className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                            theme === 'dark' ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-gray-200 dark:border-gray-600'
                          }`}
                          onClick={() => {
                            setTheme('dark');
                            playSound('click');
                            vibrate(30);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Moon className="w-8 h-8 text-indigo-500" />
                          <span className="font-medium text-foreground">Oscuro</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Sound & Vibration */}
                    <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
                      <p className="font-semibold text-foreground mb-3">Efectos</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Volume2 className="w-5 h-5 text-muted-foreground" />
                            <span className="text-foreground">Sonidos</span>
                          </div>
                          <motion.button
                            className={`w-12 h-7 rounded-full p-1 transition-colors ${
                              soundEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                            onClick={() => {
                              setSoundEnabled(!soundEnabled);
                              if (!soundEnabled) playSound('success');
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              className="w-5 h-5 bg-white rounded-full shadow"
                              animate={{ x: soundEnabled ? 20 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </motion.button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Vibrate className="w-5 h-5 text-muted-foreground" />
                            <span className="text-foreground">Vibración</span>
                          </div>
                          <motion.button
                            className={`w-12 h-7 rounded-full p-1 transition-colors ${
                              vibrationEnabled ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                            onClick={() => {
                              setVibrationEnabled(!vibrationEnabled);
                              if (!vibrationEnabled) vibrate([30, 50, 30]);
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              className="w-5 h-5 bg-white rounded-full shadow"
                              animate={{ x: vibrationEnabled ? 20 : 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : settingsSection === 'permissions' ? (
                  // Permissions Section - Real Browser Permissions
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {[
                      { key: 'camera', icon: Camera, label: 'Cámara', desc: 'Para tomar fotos de alimentos' },
                      { key: 'notifications', icon: Bell, label: 'Notificaciones', desc: 'Alertas y recordatorios' },
                      { key: 'location', icon: Lock, label: 'Ubicación', desc: 'Para encontrar restaurantes cercanos' },
                      { key: 'microphone', icon: Eye, label: 'Micrófono', desc: 'Para comandos de voz' },
                    ].map((item) => (
                      <div key={item.key} className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          permissions[item.key as keyof typeof permissions].granted 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          <item.icon className={`w-5 h-5 transition-colors ${
                            permissions[item.key as keyof typeof permissions].granted 
                              ? 'text-green-500' 
                              : 'text-gray-400 dark:text-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        
                        {permissions[item.key as keyof typeof permissions].loading ? (
                          <motion.div
                            className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                        ) : permissions[item.key as keyof typeof permissions].granted ? (
                          <span className="text-xs font-semibold px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Activo
                          </span>
                        ) : (
                          <motion.button
                            onClick={() => requestPermission(item.key as 'camera' | 'notifications' | 'location' | 'microphone')}
                            className="text-xs font-semibold px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-green-100 hover:text-green-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Activar
                          </motion.button>
                        )}
                      </div>
                    ))}
                    
                    {/* Info about permissions */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Información</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            Los permisos se solicitan al navegador. Solo se activarán si el usuario los acepta.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </div>

              {/* Delete Confirmation Modal */}
              <AnimatePresence>
                {showDeleteConfirm && (
                  <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="bg-card rounded-3xl p-6 max-w-sm w-full border border-border"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                    >
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserX className="w-8 h-8 text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold text-center text-foreground mb-2">¿Eliminar cuenta?</h3>
                      <p className="text-muted-foreground text-center mb-6">Esta acción es permanente y no se puede deshacer. Todos tus datos serán eliminados.</p>
                      <div className="flex gap-3">
                        <motion.button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancelar
                        </motion.button>
                        <motion.button
                          onClick={handleDeleteAccount}
                          className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Eliminar
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Modal */}
      <RokoChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        restrictions={restrictions}
        foods={foods}
        mealType={selectedMealType}
        userData={userData}
      />

      {/* Restaurant Map Modal */}
      <RestaurantMap
        isOpen={showRestaurantMap}
        onClose={() => setShowRestaurantMap(false)}
        restrictions={restrictions}
        playSound={playSound}
        vibrate={vibrate}
      />

      {/* Error Toast Notification */}
      <AnimatePresence>
        {errorToast && (
          <motion.div
            className="fixed bottom-24 left-6 right-6 bg-red-500 text-white p-4 rounded-2xl shadow-lg z-[210] flex items-center justify-between"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{errorToast}</p>
            </div>
            <button 
              onClick={() => setErrorToast(null)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Command Feedback Toast */}
      <AnimatePresence>
        {voiceCommandFeedback && (
          <motion.div
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl z-[220] flex items-center gap-3 border border-white/20"
            initial={{ y: -50, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: -50, x: '-50%', opacity: 0 }}
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <p className="text-sm font-bold tracking-tight whitespace-nowrap">{voiceCommandFeedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Sync Overlay */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div
            className="fixed inset-0 bg-white/80 backdrop-blur-md z-[200] flex flex-col items-center justify-center p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-green-500/30 mb-8 overflow-hidden relative">
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            
            <h2 className="text-2xl font-black text-gray-900 mb-2">Optimizando tu perfil...</h2>
            <p className="text-gray-500 max-w-[250px]">
              Roko está procesando tus restricciones y metas de salud científicamente.
            </p>
            
            <div className="mt-12 flex gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barcode Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
          <BarcodeScanner
            restrictions={restrictions}
            onClose={() => setShowScanner(false)}
            onAddFood={(name) => {
              setNewFood({ name, category: '', mealType: '' });
              addFood();
            }}
            playSound={playSound}
            vibrate={vibrate}
          />
        )}
      </AnimatePresence>

      {/* Roko AI Chat Section */}
      <AnimatePresence>
        {showRokoSection && (
          <AIChatSection
            restrictions={restrictions}
            foods={foods}
            mealType={selectedMealType}
            userData={userData}
            onClose={() => {
              setShowRokoSection(false);
              setVoiceInitialMessage(undefined);
            }}
            initialMessage={voiceInitialMessage}
          />
        )}
      </AnimatePresence>

      {/* Floating Voice Button */}
      {voiceSupported && (
        <motion.div className="fixed right-4 bottom-32 z-50">
          {/* Voice Error Toast */}
          <AnimatePresence>
            {voiceError && (
              <motion.div
                className="absolute bottom-full mb-3 right-0 bg-red-50 dark:bg-red-900/90 border border-red-200 dark:border-red-700 rounded-2xl p-3 shadow-lg max-w-[250px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p className="text-xs text-red-600 dark:text-red-300">{voiceError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Transcript Display */}
          <AnimatePresence>
            {isListening && transcript && (
              <motion.div
                className="absolute bottom-full mb-3 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 shadow-lg max-w-[200px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">&quot;{transcript}&quot;</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Voice Button */}
          <motion.button
            onClick={() => {
              if (isListening) {
                stopListening();
              } else {
                startListening();
              }
            }}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isListening
                ? 'bg-red-500 shadow-red-500/30'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={isListening ? { duration: 0.5, repeat: Infinity } : {}}
          >
            <Mic className="w-6 h-6 text-white" />
          </motion.button>
          
          {/* Listening Indicator */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-red-300"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      )}

      {/* Voice Not Supported Message */}
      {!voiceSupported && (
        <div className="fixed right-4 bottom-32 z-50">
          <motion.div
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-2 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <Mic className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </div>
          </motion.div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pb-safe {
          padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
        }
        .bg-size-200 {
          background-size: 200% auto;
        }
        .hover\:bg-right:hover {
          background-position: right center;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
