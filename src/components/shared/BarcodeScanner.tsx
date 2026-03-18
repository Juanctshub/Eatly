'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {
  Camera,
  X,
  AlertTriangle,
  CheckCircle,
  Loader2,
  RotateCcw,
  Flashlight,
  Search,
  Shield,
  Utensils,
} from 'lucide-react';

interface Product {
  code: string;
  product_name: string;
  brands?: string;
  ingredients_text?: string;
  allergens?: string;
  traces?: string;
  image_url?: string;
  nutriments?: {
    energy_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
    proteins_100g?: number;
  };
  nutrition_grade_fr?: string;
}

interface BarcodeScannerProps {
  restrictions: Array<{ foodItem: string; reason: string; severity: string }>;
  onClose: () => void;
  onAddFood?: (name: string) => void;
  onAddRestriction?: (name: string) => void;
}

export default function BarcodeScanner({
  restrictions,
  onClose,
  onAddFood,
  onAddRestriction,
}: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState<'safe' | 'warning' | 'danger' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  // Load TensorFlow Model
  useEffect(() => {
    let isMounted = true;
    const loadModel = async () => {
      try {
        console.log('Initializing TensorFlow...');
        await tf.ready();
        if (!isMounted) return;
        
        console.log('Loading MobileNet v2...');
        const loadedModel = await mobilenet.load({ 
          version: 2, 
          alpha: 1.0 
        });
        
        if (isMounted) {
          setModel(loadedModel);
          setIsModelLoading(false);
          console.log('IA Visual cargada con éxito');
        }
      } catch (err) {
        console.error('Failed to load TF model:', err);
        if (isMounted) {
          setError('Error cargando la IA visual local. Reintenta en unos segundos.');
          setIsModelLoading(false);
        }
      }
    };
    loadModel();
    return () => { isMounted = false; };
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('No se pudo acceder a la cámara. Verifica los permisos.');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Fetch product from OpenFoodFacts by name or barcode
  const fetchProduct = async (query: string) => {
    setLoading(true);
    setError(null);
    setProduct(null);
    setSafetyStatus(null);

    try {
      // Si es solo números, probablemente sea un código de barras. Si no, búsqueda por texto.
      const isBarcode = /^\d+$/.test(query);
      const url = isBarcode
        ? `https://world.openfoodfacts.org/api/v0/product/${query}.json`
        : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1`;

      const response = await fetch(url);
      const data = await response.json();

      let fetchedProduct = null;

      if (isBarcode && data.status === 1) {
        fetchedProduct = data.product;
      } else if (!isBarcode && data.products && data.products.length > 0) {
        fetchedProduct = data.products[0];
      }

      if (fetchedProduct) {
        setProduct(fetchedProduct);
        analyzeProductSafety(fetchedProduct);
      } else {
        setError('No se pudo identificar el alimento. Intenta escribirlo de otra forma.');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Error al analizar la imagen. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  // Analyze product safety based on restrictions
  const analyzeProductSafety = (productData: Product) => {
    const ingredientText = (productData.ingredients_text || '').toLowerCase();
    const allergens = (productData.allergens || '').toLowerCase();
    const traces = (productData.traces || '').toLowerCase();
    const combinedText = `${ingredientText} ${allergens} ${traces}`;

    let hasDanger = false;
    let hasWarning = false;

    for (const restriction of restrictions) {
      const restrictedItem = restriction.foodItem.toLowerCase();
      const restrictedWords = restrictedItem.split(',').map((w) => w.trim());

      for (const word of restrictedWords) {
        if (word && combinedText.includes(word)) {
          if (restriction.severity === 'severa') {
            hasDanger = true;
          } else {
            hasWarning = true;
          }
        }
      }
    }

    if (hasDanger) {
      setSafetyStatus('danger');
    } else if (hasWarning) {
      setSafetyStatus('warning');
    } else {
      setSafetyStatus('safe');
    }
  };

  // Handle manual code input
  const handleManualSearch = () => {
    if (manualCode.trim().length >= 3) {
      fetchProduct(manualCode.trim());
    }
  };

  // Analyze image from camera using TensorFlow.js
  const scanImage = async () => {
    if (!model || !videoRef.current || !cameraActive) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const predictions = await model.classify(videoRef.current, 3);
      
      if (predictions && predictions.length > 0) {
        // Get the top prediction
        const bestMatch = predictions[0].className.split(',')[0].trim();
        
        if (cameraActive) {
          stopCamera();
        }
        
        // Search the recognized object in OpenFoodFacts
        fetchProduct(bestMatch);
      } else {
        setError('No se reconoció el alimento en la imagen.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error classifying image:', err);
      setError('Ocurrió un error analizando la cámara.');
      setLoading(false);
    }
  };

  // Get nutrition grade color
  const getNutritionGradeColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case 'a':
        return 'bg-green-500';
      case 'b':
        return 'bg-lime-500';
      case 'c':
        return 'bg-yellow-500';
      case 'd':
        return 'bg-orange-500';
      case 'e':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <motion.button
          onClick={onClose}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>
        <h1 className="text-white font-semibold text-lg">Analizador Visual de Alimentos</h1>
        <div className="w-10" />
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        {cameraActive ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <div className="text-center px-8">
              <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-sm">
                Activa la cámara para analizar alimentos o etiquetas
              </p>
            </div>
          </div>
        )}

        {/* Scanning Frame */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-32 border-2 border-white/50 rounded-2xl relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-xl" />
          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
              <p className="text-white font-medium">Analizando imagen con IA...</p>
              <p className="text-white/70 text-sm mt-2">Identificando ingredientes y alérgenos</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Result */}
      <AnimatePresence>
        {product && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[70vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
          >
            <div className="p-6">
              {/* Handle */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              {/* Safety Badge */}
              <div className="flex justify-center mb-6">
                {safetyStatus === 'safe' && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-bold">Seguro para ti</span>
                  </div>
                )}
                {safetyStatus === 'warning' && (
                  <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-6 py-3 rounded-full">
                    <AlertTriangle className="w-6 h-6" />
                    <span className="font-bold">Precaución</span>
                  </div>
                )}
                {safetyStatus === 'danger' && (
                  <div className="flex items-center gap-2 bg-red-100 text-red-700 px-6 py-3 rounded-full">
                    <AlertTriangle className="w-6 h-6" />
                    <span className="font-bold">No recomendado</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex gap-4 mb-6">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-24 h-24 object-cover rounded-2xl"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <Utensils className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {product.product_name || 'Producto sin nombre'}
                  </h2>
                  {product.brands && (
                    <p className="text-gray-500 text-sm mt-1">{product.brands}</p>
                  )}
                  {product.nutrition_grade_fr && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">Nutri-Score:</span>
                      <span
                        className={`${getNutritionGradeColor(
                          product.nutrition_grade_fr
                        )} text-white text-sm font-bold px-2 py-0.5 rounded`}
                      >
                        {product.nutrition_grade_fr.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Ingredients */}
              {product.ingredients_text && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Ingredientes
                  </h3>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-4">
                    {product.ingredients_text}
                  </p>
                </div>
              )}

              {/* Allergens */}
              {product.allergens && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Alérgenos
                  </h3>
                  <p className="text-sm text-red-600 bg-red-50 rounded-xl p-4">
                    {product.allergens.replace(/en:/g, '').replace(/,/g, ', ')}
                  </p>
                </div>
              )}

              {/* Nutrition Info */}
              {product.nutriments && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Información nutricional (por 100g)
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {product.nutriments.energy_100g && (
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">Calorías</p>
                        <p className="font-bold text-gray-900">
                          {Math.round(product.nutriments.energy_100g / 4.184)}
                        </p>
                      </div>
                    )}
                    {product.nutriments.fat_100g && (
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">Grasas</p>
                        <p className="font-bold text-gray-900">
                          {product.nutriments.fat_100g.toFixed(1)}g
                        </p>
                      </div>
                    )}
                    {product.nutriments.carbohydrates_100g && (
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">Carbos</p>
                        <p className="font-bold text-gray-900">
                          {product.nutriments.carbohydrates_100g.toFixed(1)}g
                        </p>
                      </div>
                    )}
                    {product.nutriments.proteins_100g && (
                      <div className="bg-gray-50 rounded-xl p-3 text-center">
                        <p className="text-xs text-gray-500">Proteínas</p>
                        <p className="font-bold text-gray-900">
                          {product.nutriments.proteins_100g.toFixed(1)}g
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => {
                    onAddFood?.(product.product_name || 'Producto escaneado');
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-green-500/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Agregar a mis alimentos
                </motion.button>
                <motion.button
                  onClick={() => setProduct(null)}
                  className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      {!product && (
        <div className="bg-white rounded-t-3xl p-6">
          {/* Manual Input */}
          <div className="mb-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="¿Qué alimento vas a comer? (Ej: Oreo)"
                  className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl text-gray-900 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <motion.button
                onClick={handleManualSearch}
                disabled={manualCode.trim().length < 3}
                className="px-6 bg-green-500 text-white rounded-2xl font-semibold disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Analizar
              </motion.button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!cameraActive ? (
              <motion.button
                onClick={startCamera}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera className="w-5 h-5" />
                Activar cámara
              </motion.button>
            ) : (
              <>
                <motion.button
                  onClick={stopCamera}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <X className="w-5 h-5" />
                  Cerrar cámara
                </motion.button>
                <motion.button
                  onClick={scanImage}
                  disabled={isModelLoading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isModelLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ScanLine className="w-5 h-5" />
                  )}
                  {isModelLoading ? 'Cargando IA...' : 'Capturar y Analizar'}
                </motion.button>
              </>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-50 text-red-600 rounded-xl p-4 text-sm text-center">
              {error}
            </div>
          )}

          {/* Info */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Apunta a cualquier alimento o etiqueta para verificar si es seguro según tus restricciones médicas.
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ScanLine icon component
function ScanLine({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}
