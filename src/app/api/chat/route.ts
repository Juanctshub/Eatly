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

    const zai = await ZAI.create();
    
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ];

    const response = await zai.chat.completions.create({
      messages: messages as any
    });

    const aiContent = response.choices?.[0]?.message?.content || response.message?.content || response.data?.content || "Lo siento, no pude procesar tu solicitud.";

    return NextResponse.json({
      success: true,
      response: aiContent,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Lo siento, tuve un problema al procesar tu mensaje. Por favor intenta de nuevo.' 
    }, { status: 500 });
  }
}
