import { NextRequest, NextResponse } from 'next/server';
import { NeuralEngine } from '@/lib/neural-engine';

export async function POST(req: NextRequest) {
  try {
    const { image, restrictions } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'Falta la imagen para analizar' }, { status: 400 });
    }

    // Call the new vision system
    console.log('[Scanner] Enviando imagen a Roko Vision (Gemini)...');
    const analysis = await NeuralEngine.visionAnalyze(image, restrictions || []);
    console.log('[Scanner] Análisis completado con éxito:', analysis.name);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('[Vision Analyze API] Error Crítico:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
