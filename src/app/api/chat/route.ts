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

    // Use environment variable or fallback to the previous URL
    const AI_URL = process.env.AI_SERVER_URL || 'https://ready-weeks-listen.loca.lt/api/ai/chat';
    
    console.log(`Attempting to connect to AI server at ${AI_URL}`);
    const startTime = Date.now();
    
    try {
      const response = await fetch(AI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages
        }),
        signal: AbortSignal.timeout(8000) // 8 second timeout
      });

      if (response.ok) {
        const data = await response.json();
        const aiContent = data.choices?.[0]?.message?.content || data.response || "Lo siento, no pude procesar tu solicitud.";

        return NextResponse.json({
          success: true,
          response: aiContent,
          timestamp: new Date().toISOString()
        });
      }
    } catch (fetchError) {
      console.warn('AI fetch failed, using internal fallback logic:', fetchError);
    }

    // --- SMART FALLBACK LOGIC ---
    // If API fails, Roko uses internal knowledge to stay useful
    const lowerMsg = message.toLowerCase();
    let fallbackMsg = "Como tu asistente Roko 🥗, he analizado tu petición. Basado en tus restricciones ";
    
    if (restrictions && restrictions.length > 0) {
      const resList = restrictions.map((r: any) => r.foodItem).join(', ');
      fallbackMsg += `de **${resList}**, te recomiendo optar por ingredientes naturales frescos. `;
    } else {
      fallbackMsg += "generales, te sugiero priorizar proteínas magras y vegetales de temporada. ";
    }

    if (lowerMsg.includes('receta') || lowerMsg.includes('cocinar')) {
      fallbackMsg += "\n\nPara una receta rápida: Saltea tus vegetales favoritos con aceite de oliva, agrega una proteína segura (pollo o tofu) y sazona con hierbas naturales en lugar de salsas procesadas.";
    } else if (lowerMsg.includes('restaurante') || lowerMsg.includes('comer fuera')) {
      fallbackMsg += "\n\nSi sales a comer, siempre informa al mesero sobre tus alergias y pide platos 'al natural' para evitar contaminaciones ocultas.";
    } else {
      fallbackMsg += "\n\n¿Tienes algún ingrediente específico que quieras verificar ahora mismo?";
    }

    return NextResponse.json({
      success: true,
      response: fallbackMsg,
      timestamp: new Date().toISOString(),
      isFallback: true
    });

  } catch (error: any) {
    console.error('Chat API Fatal Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Hubo un problema técnico, pero sigo aquí para ayudarte.',
      details: error.message
    }, { status: 500 });
  }
}
