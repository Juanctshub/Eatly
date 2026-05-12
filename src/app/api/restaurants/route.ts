import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const radius = searchParams.get('radius') || '3000';

    if (!lat || !lon) {
      return NextResponse.json({ error: 'lat y lon requeridos' }, { status: 400 });
    }

    // Simplified query - only restaurant, cafe, and fast_food for speed
    const query = `[out:json][timeout:25];(node["amenity"~"restaurant|cafe|fast_food"](around:${radius},${lat},${lon}););out body;`;

    // Use POST with form body - this is the reliable method for Overpass
    const body = `data=${encodeURIComponent(query)}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text().catch(() => 'Unknown');
      console.error(`Overpass responded ${response.status}: ${text.substring(0, 200)}`);
      return NextResponse.json(
        { error: `Overpass API error: ${response.status}`, details: text.substring(0, 200) },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Restaurant proxy error:', error.message);
    
    if (error.name === 'AbortError') {
      return NextResponse.json({ error: 'Timeout al buscar restaurantes' }, { status: 504 });
    }
    
    return NextResponse.json(
      { error: 'Error al buscar restaurantes', details: error.message },
      { status: 500 }
    );
  }
}
