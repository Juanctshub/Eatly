import { NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, restrictions, foods, mealType, conversationHistory } = body;

    const systemPrompt = `Eres Roko, el asistente de nutrición inteligente oficial de la app Eatly. 
Tu misión es ayudar al usuario a comer sano basándote en sus restricciones médicas y alimentos disponibles.

DATOS DEL USUARIO:
- Restricciones/Alergias: ${restrictions?.map((r: any) => `${r.foodItem} (${r.reason} - ${r.severity})`).join(', ') || 'Ninguna'}
- Alimentos en casa: ${foods?.map((f: any) => f.name).join(', ') || 'No especificados'}
- Momento actual: ${mealType || 'Almuerzo'}

REGLAS DE RESPUESTA:
1. Sé amable, profesional y motivador. Usa emojis de comida 🥗🍎.
2. NUNCA sugieras alimentos prohibidos por las restricciones del usuario.
3. Si el usuario pregunta algo fuera de nutrición, redirígelo amablemente.
4. Mantén tus respuestas concisas y fáciles de leer en dispositivos móviles.
5. Usa links si sugieres recetas externas de sitios confiables.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ];

    console.log('Attempting to connect to AI server at https://spa-attach-latest-try.trycloudflare.com/v1/chat/completions');
    const startTime = Date.now();
    
    const response = await fetch('https://spa-attach-latest-try.trycloudflare.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer Z.ai'
      },
      body: JSON.stringify({
        model: 'default',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      }),
      signal: AbortSignal.timeout(8000) // 8 second timeout
    });

    const duration = Date.now() - startTime;
    console.log(`AI Response received in ${duration}ms status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu solicitud.";

    return NextResponse.json({
      success: true,
      response: aiContent,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Lo siento, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo.',
      details: error.message
    }, { status: 500 });
  }
}
