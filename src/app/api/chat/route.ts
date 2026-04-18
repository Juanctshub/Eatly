import { NextResponse } from 'next/server';
import { NeuralEngine } from '@/lib/neural-engine';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, restrictions, foods, foodLog, mealType, userData, conversationHistory } = body;

    console.log('--- NeuralEngine Chat Request ---');
    const result = await NeuralEngine.chat(message, {
      restrictions,
      foods,
      foodLog,
      mealType,
      userData,
      conversationHistory
    });

    return NextResponse.json({
      success: true,
      source: result.source,
      response: result.content,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('NeuralEngine Chat API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Hubo un problema con la inteligencia artificial.',
      details: error.message
    }, { status: 500 });
  }
}

