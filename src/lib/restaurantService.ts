// Restaurant Service - Uses OpenStreetMap Overpass API to find all food establishments

export interface Restaurant {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'fast_food' | 'food_court' | 'pub' | 'bar' | 'ice_cream' | 'bakery';
  cuisine?: string;
  lat: number;
  lon: number;
  distance: number;
  address?: string;
  phone?: string;
  website?: string;
  openingHours?: string;
  rating?: number;
  tags?: string[];
}

// Get user's current location
export async function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no soportada en este navegador'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let message = 'Error al obtener ubicación';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Permiso de ubicación denegado. Por favor activa la ubicación.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Ubicación no disponible. Intenta de nuevo.';
            break;
          case error.TIMEOUT:
            message = 'Tiempo de espera agotado para obtener ubicación.';
            break;
        }
        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
}

// Calculate distance between two points (Haversine formula)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Overpass API query to get all food establishments
export async function searchNearbyRestaurants(
  lat: number,
  lon: number,
  radius: number = 3000
): Promise<Restaurant[]> {
  // Comprehensive query for all food establishments
  const query = `
    [out:json][timeout:30];
    (
      node["amenity"="restaurant"](around:${radius},${lat},${lon});
      node["amenity"="cafe"](around:${radius},${lat},${lon});
      node["amenity"="fast_food"](around:${radius},${lat},${lon});
      node["amenity"="food_court"](around:${radius},${lat},${lon});
      node["amenity"="pub"](around:${radius},${lat},${lon});
      node["amenity"="bar"]["food"="yes"](around:${radius},${lat},${lon});
      node["amenity"="ice_cream"](around:${radius},${lat},${lon});
      node["amenity"="bakery"](around:${radius},${lat},${lon});
      way["amenity"="restaurant"](around:${radius},${lat},${lon});
      way["amenity"="cafe"](around:${radius},${lat},${lon});
      way["amenity"="fast_food"](around:${radius},${lat},${lon});
      way["amenity"="food_court"](around:${radius},${lat},${lon});
      way["amenity"="pub"](around:${radius},${lat},${lon});
      way["amenity"="ice_cream"](around:${radius},${lat},${lon});
      way["amenity"="bakery"](around:${radius},${lat},${lon});
    );
    out body center;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error('Error al buscar restaurantes');
    }

    const data = await response.json();
    
    const restaurants: Restaurant[] = data.elements
      .filter((el: any) => el.tags && el.tags.name)
      .map((el: any) => {
        const elLat = el.lat || el.center?.lat;
        const elLon = el.lon || el.center?.lon;
        
        return {
          id: `${el.type}_${el.id}`,
          name: el.tags.name || 'Sin nombre',
          type: el.tags.amenity || 'restaurant',
          cuisine: el.tags.cuisine,
          lat: elLat,
          lon: elLon,
          distance: calculateDistance(lat, lon, elLat, elLon),
          address: el.tags['addr:street']
            ? `${el.tags['addr:housenumber'] || ''} ${el.tags['addr:street']}`.trim()
            : undefined,
          phone: el.tags.phone || el.tags['contact:phone'],
          website: el.tags.website || el.tags['contact:website'],
          openingHours: el.tags.opening_hours,
          tags: Object.keys(el.tags).map(key => `${key}:${el.tags[key]}`),
        };
      })
      .sort((a: Restaurant, b: Restaurant) => a.distance - b.distance);

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}

// Get type label in Spanish
export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    restaurant: 'Restaurante',
    cafe: 'Cafetería',
    fast_food: 'Comida Rápida',
    food_court: 'Área de Comida',
    pub: 'Bar/Restaurante',
    bar: 'Bar',
    ice_cream: 'Heladería',
    bakery: 'Panadería',
  };
  return labels[type] || 'Restaurante';
}

// Get type icon
export function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    restaurant: '🍽️',
    cafe: '☕',
    fast_food: '🍔',
    food_court: '🏪',
    pub: '🍺',
    bar: '🍸',
    ice_cream: '🍦',
    bakery: '🥖',
  };
  return icons[type] || '🍽️';
}

// Get type color
export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    restaurant: 'from-orange-400 to-red-500',
    cafe: 'from-amber-400 to-orange-500',
    fast_food: 'from-yellow-400 to-amber-500',
    food_court: 'from-purple-400 to-pink-500',
    pub: 'from-indigo-400 to-purple-500',
    bar: 'from-pink-400 to-rose-500',
    ice_cream: 'from-pink-300 to-purple-400',
    bakery: 'from-amber-300 to-orange-400',
  };
  return colors[type] || 'from-gray-400 to-gray-500';
}
