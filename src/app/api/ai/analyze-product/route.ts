import { NextRequest, NextResponse } from 'next/server';
import { NeuralEngine } from '@/lib/neural-engine';

export async function POST(req: NextRequest) {
  try {
    const { ingredients, restrictions } = await req.json();

    if (!ingredients) {
      return NextResponse.json({ error: 'Faltan los ingredientes' }, { status: 400 });
    }

    const analysis = await NeuralEngine.analyzeIngredients(ingredients, restrictions || []);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('[Analyze Product API] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
