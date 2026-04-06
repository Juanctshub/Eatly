import { NextRequest, NextResponse } from 'next/server';
import { NeuralEngine } from '@/lib/neural-engine';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const { image, restrictions, userData } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'Falta la imagen para analizar' }, { status: 400 });
    }

    // Call the new vision system with user medical context (v7.1)
    console.log('[Scanner] Enviando imagen a Roko Vision (Gemini) con contexto médico...');
    const analysis = await NeuralEngine.visionAnalyze(image, restrictions || [], userData || {});
    console.log('[Scanner] Análisis completado con éxito:', analysis.name);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('[Vision Analyze API] Error Crítico de Roko:', error.message);
    // Be very explicit with the error for the frontend
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
