'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Camera, 
  AlertTriangle, 
  CheckCircle, 
  Loader2, 
  RotateCcw, 
  Search,
  Shield,
  Utensils,
  Zap,
  Info,
  ScanLine
} from 'lucide-react';

interface Product {
  code: string;
  product_name: string;
  ingredients_text?: string;
  nutriments: {
    energy_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
    proteins_100g?: number;
  };
  brand?: string;
}

interface BarcodeScannerProps {
  onClose: () => void;
  onAddFood: (name: string) => void;
  restrictions: any[];
  playSound?: (type: 'success' | 'click' | 'error') => void;
  vibrate?: () => void;
}

export default function BarcodeScanner({ 
  onClose, 
  onAddFood, 
  restrictions,
  playSound,
  vibrate
}: BarcodeScannerProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // States for AI Analysis
  const [aiAnalysis, setAiAnalysis] = useState<{
    safety: 'safe' | 'warning' | 'danger';
    verdict: string;
    reason: string;
    ingredients?: string;
  } | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      setCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('No se pudo acceder a la cámara. Verifica los permisos.');
    }
  }, []);

  // Connect stream to video element
  useEffect(() => {
    if (cameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(console.error);
    }
  }, [cameraActive]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  // Capture frame and send to Vision AI
  const scanImage = async () => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;

    setLoading(true);
    setError(null);
    setProduct(null);
    setAiAnalysis(null);

    try {
      // Resize and send to Vision API
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      // Use a fixed max dimension for reliable API transfer (reducing payload size)
      const maxDim = 800;
      let width = video.videoWidth;
      let height = video.videoHeight;
      
      if (width > height) {
        if (width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No se pudo inicializar el canvas');
      
      ctx.drawImage(video, 0, 0, width, height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.7); // 70% quality is plenty for AI

      if (vibrate) vibrate();
      if (playSound) playSound('click');

      // Send to Vision API
      const response = await fetch('/api/ai/vision-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image, restrictions }),
      });

      if (!response.ok) throw new Error('Error en el análisis de visión');

      const data = await response.json();

      // Transform to product UI format
      setProduct({
        code: 'vision_ai',
        product_name: data.name,
        brand: data.brand,
        ingredients_text: data.ingredients,
        nutriments: {
          energy_100g: data.calories * 4.184, // convert kcal to kJ for format consistency
          proteins_100g: data.proteins,
          fat_100g: data.fats,
          carbohydrates_100g: data.carbs,
        }
      });

      setAiAnalysis({
        safety: data.safety,
        verdict: data.verdict,
        reason: data.reason,
        ingredients: data.ingredients
      });

      if (playSound) playSound('success');
      stopCamera();

    } catch (err: any) {
      console.error('Vision Scan Error:', err);
      setError('No pude analizar la imagen. Intenta enfocar mejor al alimento.');
      if (playSound) playSound('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative w-full h-full max-w-md mx-auto overflow-hidden bg-[#0a0a0b]">
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="text-white text-xl font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Roko Vision
              </h2>
              <p className="text-white/60 text-xs font-medium tracking-wider uppercase">Analizador de Alimentos HD</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Camera View */}
        <div className="relative w-full h-full">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 gap-6">
              {!product && !loading && (
                <>
                  <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 animate-pulse">
                    <Camera className="w-10 h-10 text-green-400" />
                  </div>
                  <button
                    onClick={startCamera}
                    className="px-8 py-4 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                  >
                    Activar Ojo de Roko
                  </button>
                </>
              )}
            </div>
          )}

          {/* Hidden Canvas for capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Scanning Overlay (UI Visual Only) */}
          <AnimatePresence>
            {cameraActive && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
              >
                <div className="relative w-72 h-72">
                  <div className="absolute inset-0 border-2 border-white/20 rounded-[32px]" />
                  <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-green-400 rounded-tl-[32px]" />
                  <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-green-400 rounded-tr-[32px]" />
                  <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-green-400 rounded-bl-[32px]" />
                  <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-green-400 rounded-tr-[32px]" />
                  
                  <motion.div 
                    className="absolute left-6 right-6 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                    animate={{ top: ['10%', '90%', '10%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading States */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-6"
              >
                <div className="relative">
                  <Loader2 className="w-16 h-16 text-green-400 animate-spin" />
                  <Zap className="w-6 h-6 text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-white text-lg font-bold">Roko está mirando...</p>
                  <p className="text-white/60 text-sm">Escaneando moléculas y marca</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-32 left-6 right-6 z-50 p-4 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-2xl flex items-center gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-red-200 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Camera Controls */}
          {cameraActive && !loading && (
            <div className="absolute bottom-10 left-0 right-0 z-50 flex justify-center px-6">
              <button
                onClick={scanImage}
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border-4 border-white/40 flex items-center justify-center group active:scale-90 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-white group-hover:bg-green-400 transition-colors" />
              </button>
            </div>
          )}

          {/* Analysis Results View */}
          <AnimatePresence>
            {product && (
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="absolute inset-0 z-[60] bg-[#0a0a0b] overflow-y-auto"
              >
                <div className="p-6 space-y-6 pb-32">
                  {/* Result Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-tighter rounded-md border border-green-500/30">Identificado</span>
                        {product.brand && <span className="text-white/40 text-[10px] font-bold uppercase">{product.brand}</span>}
                      </div>
                      <h3 className="text-white text-2xl font-bold">{product.product_name}</h3>
                    </div>
                    <button 
                      onClick={() => { setProduct(null); setAiAnalysis(null); startCamera(); }}
                      className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/60 hover:text-white"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Safety Verdict Card */}
                  {aiAnalysis && (
                    <motion.div 
                      className={`p-5 rounded-[28px] border-2 shadow-2xl ${
                        aiAnalysis.safety === 'safe' ? 'bg-emerald-500/10 border-emerald-500/30' :
                        aiAnalysis.safety === 'warning' ? 'bg-amber-500/10 border-amber-500/30' :
                        'bg-red-500/10 border-red-500/30'
                      }`}
                    >
                      <div className="flex item-center gap-3 mb-4">
                        <div className={`p-2 rounded-xl ${
                          aiAnalysis.safety === 'safe' ? 'bg-emerald-500 text-black' :
                          aiAnalysis.safety === 'warning' ? 'bg-amber-500 text-black' :
                          'bg-red-500 text-white'
                        }`}>
                          {aiAnalysis.safety === 'safe' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="text-white font-bold leading-none mb-1">Veredicto de Roko</h4>
                          <p className={`text-xs font-medium ${
                            aiAnalysis.safety === 'safe' ? 'text-emerald-400' :
                            aiAnalysis.safety === 'warning' ? 'text-amber-400' :
                            'text-red-400'
                          }`}>Análisis Nutro-Genético</p>
                        </div>
                      </div>
                      <p className="text-white/90 text-sm font-medium italic leading-relaxed mb-4">"{aiAnalysis.verdict}"</p>
                      <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                        <p className="text-white/60 text-xs leading-relaxed uppercase tracking-wide font-bold mb-1 opacity-50">Análisis Químico</p>
                        <p className="text-white/80 text-sm leading-relaxed">{aiAnalysis.reason}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Nutritional Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <NutritionCard label="Calorías" value={Math.round((product.nutriments.energy_100g || 0) / 4.184)} unit="kcal" icon={<Zap className="w-4 h-4 text-yellow-400" />} color="bg-yellow-400" />
                    <NutritionCard label="Proteínas" value={product.nutriments.proteins_100g || 0} unit="g" icon={<Utensils className="w-4 h-4 text-blue-400" />} color="bg-blue-400" />
                    <NutritionCard label="Grasas" value={product.nutriments.fat_100g || 0} unit="g" icon={<Info className="w-4 h-4 text-rose-400" />} color="bg-rose-400" />
                    <NutritionCard label="Carbohidratos" value={product.nutriments.carbohydrates_100g || 0} unit="g" icon={<Search className="w-4 h-4 text-emerald-400" />} color="bg-emerald-400" />
                  </div>

                  {/* Ingredients List */}
                  {product.ingredients_text && (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Info className="w-4 h-4 text-green-400" />
                        Componentes Detectados
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {product.ingredients_text}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={onClose}
                      className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                    >
                      Cerrar
                    </button>
                    <button
                      onClick={() => onAddFood(product.product_name)}
                      className="flex-[2] py-4 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                    >
                      Agregar al Diario
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function NutritionCard({ label, value, unit, icon, color }: { label: string, value: number | string, unit: string, icon: any, color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-white/[0.08] transition-all">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-lg bg-black/40`}>{icon}</div>
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white">{value}</span>
        <span className="text-xs font-bold text-white/30">{unit}</span>
      </div>
    </div>
  );
}
