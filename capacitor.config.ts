import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.eatly.app',
  appName: 'Eatly',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: "#030712",
      showSpinner: false,
      androidScaleType: "CENTER_CROP"
    },
  },
};

export default config;
