import { NextRequest, NextResponse } from 'next/server';
import { NeuralEngine } from '@/lib/neural-engine';

export async function POST(req: NextRequest) {
  try {
    const { foodName } = await req.json();

    if (!foodName) {
      return NextResponse.json({ error: 'Falta el nombre del alimento' }, { status: 400 });
    }

    const category = await NeuralEngine.categorizeFood(foodName);

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    console.error('[Categorize API] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
