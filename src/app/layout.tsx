import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AppProviders } from "@/components/app-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#22c55e",
};

export const metadata: Metadata = {
  title: "Eatly - Tu Asistente de Alimentación Segura",
  description: "App móvil que te ayuda a elegir comidas seguras basadas en tus restricciones alimentarias, alergias y dietas específicas. Chatea con Roko, tu nutriólogo IA.",
  keywords: ["dietas", "alergias", "alimentación", "nutrición", "restricciones alimentarias", "salud", "nutriólogo IA"],
  authors: [{ name: "Eatly Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Eatly",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Eatly",
    title: "Eatly - Tu Asistente de Alimentación Segura",
    description: "App móvil que te ayuda a elegir comidas seguras basadas en tus restricciones alimentarias. Con Roko, tu nutriólogo IA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eatly",
    description: "Tu asistente de alimentación segura con Roko, tu nutriólogo IA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-foreground transition-colors duration-300`}
      >
        <AppProviders>
          {children}
        </AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
