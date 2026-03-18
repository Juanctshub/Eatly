'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SplashScreen } from '@/components/splash-screen';
import { AuthPage } from '@/components/auth-page';
import { LoadingScreen } from '@/components/loading-screen';
import MainApp from '@/components/main-app';

interface UserData {
  id: string;
  email: string;
  name: string;
}

function AppContent() {
  const [appState, setAppState] = useState<'splash' | 'auth' | 'loading' | 'app'>('splash');
  const [userData, setUserData] = useState<UserData | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const savedUser = localStorage.getItem('dietadvisor_user');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setUserData(user);
          setAppState('loading');
          return;
        } catch {
          localStorage.removeItem('dietadvisor_user');
        }
      }
    };

    // Start splash screen
    const splashTimer = setTimeout(() => {
      checkSession();
      if (!localStorage.getItem('dietadvisor_user')) {
        setAppState('auth');
      }
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  const handleAuthSuccess = useCallback((user: UserData) => {
    // Save user to localStorage for persistence
    localStorage.setItem('dietadvisor_user', JSON.stringify(user));
    setUserData(user);
    setAppState('loading');
  }, []);

  // Auto-advance from loading after animation completes
  useEffect(() => {
    if (appState === 'loading') {
      const timer = setTimeout(() => {
        setAppState('app');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  return (
    <AnimatePresence mode="wait">
      {appState === 'splash' && (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SplashScreen />
        </motion.div>
      )}

      {appState === 'auth' && (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        </motion.div>
      )}

      {appState === 'loading' && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingScreen userName={userData?.name} />
        </motion.div>
      )}

      {appState === 'app' && (
        <motion.div
          key="app"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <MainApp />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return <AppContent />;
}
