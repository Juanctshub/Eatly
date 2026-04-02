'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  X,
  MapPin,
  Phone,
  ExternalLink,
  Navigation,
  Clock,
  Utensils,
  Coffee,
  Pizza,
  Beer,
  IceCream,
  Cookie,
  Store,
  ChefHat,
  Star,
  RefreshCw,
  Filter,
  ChevronDown,
} from 'lucide-react';
import {
  searchNearbyRestaurants,
  getCurrentLocation,
  getTypeLabel,
  getTypeIcon,
  getTypeColor,
  Restaurant,
} from '@/lib/restaurantService';

// Leaflet styles
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet map (SSR safe)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface RestaurantMapProps {
  isOpen: boolean;
  onClose: () => void;
  restrictions: { foodItem: string; reason: string }[];
  playSound?: (type: 'success' | 'click' | 'error') => void;
  vibrate?: (pattern: number | number[]) => void;
}

// Type filter options
const typeFilters = [
  { id: 'all', label: 'Todos', icon: Store },
  { id: 'restaurant', label: 'Restaurantes', icon: Utensils },
  { id: 'cafe', label: 'Cafeterías', icon: Coffee },
  { id: 'fast_food', label: 'Comida Rápida', icon: Pizza },
  { id: 'pub', label: 'Bares', icon: Beer },
  { id: 'ice_cream', label: 'Heladerías', icon: IceCream },
  { id: 'bakery', label: 'Panaderías', icon: Cookie },
];

// Map center component to handle location updates
function MapCenterHandler({ center }: { center: [number, number] }) {
  const [L, setL] = useState<any>(null);
  
  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  useEffect(() => {
    if (L) {
      // This would update map center if needed
    }
  }, [center, L]);

  return null;
}

// Custom marker icon
function createCustomIcon(type: string) {
  if (typeof window === 'undefined') return null;
  
  return {
    iconUrl: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 50" width="40" height="50">
        <path d="M20 0C8.95 0 0 8.95 0 20c0 15 20 30 20 30s20-15 20-30C40 8.95 31.05 0 20 0z" fill="#22c55e"/>
        <circle cx="20" cy="18" r="10" fill="white"/>
        <text x="20" y="24" text-anchor="middle" font-size="14">${getTypeIcon(type)}</text>
      </svg>
    `)}`,
    iconSize: [40, 50] as [number, number],
    iconAnchor: [20, 50] as [number, number],
    popupAnchor: [0, -50] as [number, number],
  };
}

export default function RestaurantMap({ isOpen, onClose, restrictions, playSound, vibrate }: RestaurantMapProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSafeOnly, setShowSafeOnly] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showList, setShowList] = useState(true);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [L, setL] = useState<any>(null);

  // Load Leaflet
  useEffect(() => {
    if (isOpen) {
      import('leaflet').then((leaflet) => {
        setL(leaflet.default);
        setLeafletLoaded(true);
      });
    }
  }, [isOpen]);

  // Load restaurants
  const loadRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      
      const results = await searchNearbyRestaurants(location.lat, location.lon, 3000);
      setRestaurants(results);
      setFilteredRestaurants(results);
    } catch (err: any) {
      setError(err.message || 'Error al cargar restaurantes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter restaurants
  useEffect(() => {
    let filtered = restaurants;
    if (activeFilter !== 'all') {
      filtered = filtered.filter(r => r.type === activeFilter);
    }
    if (showSafeOnly) {
      filtered = filtered.filter(r => checkRestrictions(r).length === 0);
    }
    setFilteredRestaurants(filtered);
  }, [activeFilter, restaurants, showSafeOnly]);

  // Load on open
  useEffect(() => {
    if (isOpen && restaurants.length === 0) {
      loadRestaurants();
    }
  }, [isOpen, restaurants.length, loadRestaurants]);

  // Group restaurants by type
  const groupedRestaurants = useMemo(() => {
    const groups: Record<string, Restaurant[]> = {};
    filteredRestaurants.forEach(r => {
      if (!groups[r.type]) {
        groups[r.type] = [];
      }
      groups[r.type].push(r);
    });
    return groups;
  }, [filteredRestaurants]);

  // Check if any restriction might be violated
  const checkRestrictions = (restaurant: Restaurant): string[] => {
    if (!restrictions || restrictions.length === 0) return [];
    
    const warnings: string[] = [];
    const restrictedItems = restrictions.map(r => r.foodItem.toLowerCase().trim());
    
    // Check name, cuisine, types and address
    const searchableText = [
      restaurant.name,
      restaurant.cuisine || '',
      restaurant.address || '',
      restaurant.type || '',
      ...(restaurant.tags || [])
    ].join(' ').toLowerCase();

    restrictedItems.forEach(item => {
      // Use case-insensitive search for the ingredient in name or cuisine attributes
      if (searchableText.includes(item)) {
        warnings.push(item);
      }
    });
    
    return warnings;
  };

  // Open in Google Maps
  const openInMaps = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${restaurant.lat},${restaurant.lon}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gray-100 dark:bg-gray-900 z-[1000]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header - Forced to front with extreme Z-index */}
      <div className="absolute top-0 left-0 right-0 z-[9999] bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl border-b border-border">
        <div className="flex items-center justify-between p-4">
          <motion.button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </motion.button>
          
          <div className="text-center">
            <h2 className="font-bold text-gray-900 dark:text-white">Explorar Restaurantes</h2>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">
                {filteredRestaurants.length} LUGARES ENCONTRADOS
              </p>
            </div>
          </div>
          
          <motion.button
            onClick={loadRestaurants}
            disabled={loading}
            className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className={`w-5 h-5 text-green-600 dark:text-green-400 ${loading ? 'animate-spin' : ''}`} />
          </motion.button>
        </div>
        
        {/* Type Filters */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {typeFilters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                  activeFilter === filter.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
                {filter.id !== 'all' && (
                  <span className="text-xs opacity-70">
                    ({restaurants.filter(r => r.type === filter.id).length})
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Safety Toggle */}
        <div className="px-4 pb-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700/50 pt-3">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                 <Filter className="w-4 h-4 text-red-500" />
              </div>
              <div>
                 <p className="text-sm font-bold text-gray-900 dark:text-white">Sólo lugares seguros</p>
                 <p className="text-[10px] text-gray-500">Filtrar riesgos de alérgenos</p>
              </div>
           </div>
           <motion.button
              onClick={() => {
                setShowSafeOnly(!showSafeOnly);
                vibrate?.(40);
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${showSafeOnly ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              whileTap={{ scale: 0.9 }}
           >
              <motion.div 
                 className="w-4 h-4 bg-white rounded-full shadow-sm"
                 animate={{ x: showSafeOnly ? 24 : 0 }}
              />
           </motion.button>
        </div>
      </div>

      {/* Map Container - Pushed to background */}
      <div className="absolute inset-0 pt-48 z-0">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="text-gray-600 dark:text-gray-300">Buscando restaurantes...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full p-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-sm text-center shadow-xl">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Error</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
              <motion.button
                onClick={loadRestaurants}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Reintentar
              </motion.button>
            </div>
          </div>
        )}

        {!loading && !error && leafletLoaded && userLocation && L && (
          <MapContainer
            center={[userLocation.lat, userLocation.lon]}
            zoom={15}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* User location marker */}
            <Marker
              position={[userLocation.lat, userLocation.lon]}
              icon={L.divIcon({
                className: 'user-marker',
                html: `
                  <div style="
                    width: 20px;
                    height: 20px;
                    background: #3b82f6;
                    border: 4px solid white;
                    border-radius: 50%;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                  "></div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })}
            >
              <Popup>
                <div className="text-center p-1">
                  <p className="font-semibold">Tu ubicación</p>
                </div>
              </Popup>
            </Marker>
            
            {/* Restaurant markers */}
            {filteredRestaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                position={[restaurant.lat, restaurant.lon]}
                icon={L.divIcon({
                  className: 'restaurant-marker',
                  html: `
                    <div style="
                      width: 40px;
                      height: 40px;
                      background: linear-gradient(135deg, ${checkRestrictions(restaurant).length > 0 ? '#ef4444, #b91c1c' : '#22c55e, #16a34a'});
                      border: 3px solid white;
                      border-radius: 50% 50% 50% 0;
                      transform: rotate(-45deg);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    ">
                      <span style="transform: rotate(45deg); font-size: 16px;">${checkRestrictions(restaurant).length > 0 ? '⚠️' : getTypeIcon(restaurant.type)}</span>
                    </div>
                  `,
                  iconSize: [40, 40],
                  iconAnchor: [20, 40],
                  popupAnchor: [0, -40],
                })}
                eventHandlers={{
                  click: () => {
                    const warnings = checkRestrictions(restaurant);
                    if (warnings.length > 0) {
                       playSound?.('error');
                       vibrate?.([100, 50, 100]);
                    } else {
                       vibrate?.(50);
                    }
                    setSelectedRestaurant(restaurant);
                  },
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500">{getTypeLabel(restaurant.type)}</p>
                    <p className="text-sm text-green-600 mt-1">{restaurant.distance.toFixed(1)} km</p>
                    <motion.button
                      onClick={() => openInMaps(restaurant)}
                      className="mt-2 w-full py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Abrir en Maps
                    </motion.button>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            <MapCenterHandler center={[userLocation.lat, userLocation.lon]} />
          </MapContainer>
        )}
      </div>

      {/* Restaurant List Panel */}
      <AnimatePresence>
        {showList && !loading && !error && filteredRestaurants.length > 0 && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] max-h-[50vh] overflow-hidden z-[110]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Handle */}
            <div 
              className="flex justify-center py-3 cursor-pointer"
              onClick={() => setShowList(false)}
            >
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>
            
            {/* Summary by type */}
            <div className="px-4 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {Object.entries(groupedRestaurants).map(([type, items]: [string, any]) => (
                  <div
                    key={type}
                    className={`px-3 py-2 rounded-xl bg-gradient-to-r ${getTypeColor(type)} text-white text-xs font-medium flex items-center gap-2 whitespace-nowrap`}
                  >
                    <span>{getTypeIcon(type)}</span>
                    {getTypeLabel(type)}
                    <span className="bg-white/20 px-2 py-0.5 rounded-full">{items.length}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* List */}
            <div className="overflow-y-auto max-h-[35vh] px-4 pb-4">
              <div className="space-y-3">
                {filteredRestaurants.slice(0, 20).map((restaurant, index) => {
                  const warnings = checkRestrictions(restaurant);
                  
                  return (
                    <motion.div
                      key={restaurant.id}
                      className={`bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 relative overflow-hidden transition-all ${warnings.length > 0 ? 'opacity-50 hover:opacity-100 grayscale-[0.8] border border-red-200 dark:border-red-900/50' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: warnings.length > 0 ? 0.6 : 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => setSelectedRestaurant(restaurant)}
                    >
                      {/* Type indicator */}
                      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${warnings.length > 0 ? 'from-red-400 to-red-600' : getTypeColor(restaurant.type)}`} />
                      
                      <div className="flex items-start gap-3 pl-2">
                        <div className={`w-12 h-12 bg-gradient-to-br ${warnings.length > 0 ? 'from-red-400 to-red-600' : getTypeColor(restaurant.type)} rounded-xl flex items-center justify-center shadow-lg`}>
                          <span className="text-2xl">{getTypeIcon(restaurant.type)}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h3 className={`font-semibold truncate pr-2 ${warnings.length > 0 ? 'text-red-900 dark:text-red-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                              {restaurant.name}
                            </h3>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium whitespace-nowrap">
                              {restaurant.distance.toFixed(1)} km
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {getTypeLabel(restaurant.type)}
                            {restaurant.cuisine && ` • ${restaurant.cuisine}`}
                          </p>
                          
                          {warnings.length > 0 && (
                            <div className="mt-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/40 rounded-lg border border-red-200 dark:border-red-800">
                              <p className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center gap-1">
                                🚫 Riesgo Alto: {warnings.join(', ')}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show list button */}
      {!showList && !loading && !error && filteredRestaurants.length > 0 && (
        <motion.button
          onClick={() => setShowList(true)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-xl flex items-center gap-2 z-10"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="font-medium text-gray-900 dark:text-white">
            Ver {filteredRestaurants.length} lugares
          </span>
        </motion.button>
      )}

      {/* Selected Restaurant Detail */}
      <AnimatePresence>
        {selectedRestaurant && (
          <motion.div
            className="absolute inset-x-4 bottom-4 bg-white dark:bg-gray-800 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-[120] border border-white/10"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${getTypeColor(selectedRestaurant.type)} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <span className="text-3xl">{getTypeIcon(selectedRestaurant.type)}</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedRestaurant.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getTypeLabel(selectedRestaurant.type)}
                    {selectedRestaurant.cuisine && ` • ${selectedRestaurant.cuisine}`}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Navigation className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {selectedRestaurant.distance.toFixed(1)} km de ti
                    </span>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setSelectedRestaurant(null)}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </motion.button>
              </div>
              
              {/* Info */}
              <div className="mt-4 space-y-2">
                {selectedRestaurant.address && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedRestaurant.address}</span>
                  </div>
                )}
                
                {selectedRestaurant.phone && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${selectedRestaurant.phone}`} className="text-sm text-green-600 dark:text-green-400">
                      {selectedRestaurant.phone}
                    </a>
                  </div>
                )}
                
                {selectedRestaurant.openingHours && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{selectedRestaurant.openingHours}</span>
                  </div>
                )}
              </div>
              
              {/* Restriction warning */}
              {checkRestrictions(selectedRestaurant).length > 0 && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <h4 className="font-bold text-red-800 dark:text-red-300 flex items-center gap-2 mb-1">
                    🚫 No Recomendado
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                    Restricciones cruzadas detectadas: {checkRestrictions(selectedRestaurant).join(', ')}. Te sugerimos evitar este lugar para mantener tu seguridad.
                  </p>
                </div>
              )}
              
              {/* Actions */}
              <div className="mt-4 flex gap-3">
                <motion.button
                  onClick={() => openInMaps(selectedRestaurant)}
                  className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Navigation className="w-5 h-5" />
                  Ir ahora
                </motion.button>
                
                {selectedRestaurant.website && (
                  <motion.button
                    onClick={() => window.open(selectedRestaurant.website, '_blank')}
                    className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Web
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .leaflet-container {
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .leaflet-popup-content {
          margin: 12px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}
