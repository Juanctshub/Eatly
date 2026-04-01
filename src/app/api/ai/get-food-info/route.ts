import { NextRequest, NextResponse } from 'next/server';
import { NeuralEngine } from '@/lib/neural-engine';

export async function POST(req: NextRequest) {
  try {
    const { foodName, restrictions } = await req.json();

    if (!foodName) {
      return NextResponse.json({ error: 'Faltan el nombre del alimento' }, { status: 400 });
    }

    const info = await NeuralEngine.getFoodInfo(foodName, restrictions || []);

    return NextResponse.json(info);
  } catch (error: any) {
    console.error('[Get Food Info API] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
