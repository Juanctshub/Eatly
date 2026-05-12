import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const radius = searchParams.get('radius') || '3000';

    if (!lat || !lon) {
      return NextResponse.json({ error: 'lat y lon requeridos' }, { status: 400 });
    }

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

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Restaurant proxy error:', error);
    return NextResponse.json({ error: 'Error al buscar restaurantes' }, { status: 500 });
  }
}
