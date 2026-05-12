import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const radius = searchParams.get('radius') || '3000';

    if (!lat || !lon) {
      return NextResponse.json({ error: 'lat y lon requeridos' }, { status: 400 });
    }

    const query = `[out:json][timeout:25];(node["amenity"~"restaurant|cafe|fast_food|bakery|ice_cream"](around:${radius},${lat},${lon}););out body;`;
    const body = `data=${encodeURIComponent(query)}`;

    // List of Overpass mirrors to try in order
    const mirrors = [
      'https://overpass.kumi.systems/api/interpreter',
      'https://overpass-api.de/api/interpreter',
      'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
    ];

    let lastError = '';

    for (const mirror of mirrors) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(mirror, {
          method: 'POST',
          body: body,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data);
        }

        lastError = `${mirror}: ${response.status}`;
      } catch (e: any) {
        lastError = `${mirror}: ${e.message}`;
        continue; // Try next mirror
      }
    }

    return NextResponse.json(
      { error: 'Todos los servidores de mapas fallaron', details: lastError },
      { status: 502 }
    );

  } catch (error: any) {
    console.error('Restaurant proxy error:', error.message);
    return NextResponse.json(
      { error: 'Error interno al buscar restaurantes', details: error.message },
      { status: 500 }
    );
  }
}
