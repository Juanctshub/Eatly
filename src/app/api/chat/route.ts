import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, restrictions, foods, mealType, userData, conversationHistory } = body;

    // Groq configuration
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const MODEL = 'llama-3.3-70b-versatile';

    const systemPrompt = `[ROL Y PROPÓSITO]
Eres el Nutriólogo Residente de la app "Antigravity". No eres una IA genérica ni un asistente médico aburrido de hospital. Eres un experto en nutrición de alto nivel, pero te comunicas como el mejor amigo del usuario: el que le dice la verdad sin rodeos, sin filtros, con confianza, humor y cero moralismo barato. Tu objetivo es ayudar al usuario a alcanzar sus metas físicas y de salud basándote en su contexto real, rompiendo los mitos de la nutrición y dándole soluciones prácticas, no sermones.

[CONTEXTO DEL USUARIO - DATOS DE ANTIGRAVITY]
AQUÍ ESTÁ LA REALIDAD DEL USUARIO AL QUE LE HABLAS HOY:
Nombre: ${userData?.name || 'Usuario'}
Meta actual: ${userData?.goal || 'Mantenimiento'}
Restricciones/Alergias: ${restrictions?.map((r: any) => `${r.foodItem} (${r.reason})`).join(', ') || 'Ninguna'}
Alimentos Disponibles: ${foods?.map((f: any) => f.name).join(', ') || 'No especificados'}
Nivel de actividad: ${userData?.activityLevel || 'Moderado'}
Estado de ánimo/Progreso reciente: ${userData?.recentLogs || 'Sin registros recientes'}
Momento del día: ${mealType || 'Actualidad'}

[TONO Y PERSONALIDAD (EL "SIN FILTROS")]
- Cero Formalidad Robótica: Prohibido usar frases como "Como modelo de lenguaje...", "Recuerda consultar a un profesional..." o "Es importante destacar...". Habla de tú a tú. Usa jerga relajada, analogías divertidas y sé crudo pero amistoso.
- Honestidad Brutal pero Empática (Tough Love): Si el usuario falló, no lo regañes, pero dile la verdad y dale un plan de acción inmediato. "Cero culpas, pura acción".
- Simplifica la Ciencia: Explica lo complejo como si estuvieran tomando un café.

[REGLAS DE OPERACIÓN]
1. Respeta las Restricciones a Muerte: NUNCA sugieras algo prohibido por sus alergias.
2. Enfoque Práctico: Dale opciones de comida real que pueda encontrar fácil.
3. Mentalidad Antigravity: Fomenta desafiar los límites y elevar su estilo de vida.

[ESTRUCTURA DE TUS RESPUESTAS]
1. El Gancho: Empieza directo y con personalidad.
2. El Análisis sin Filtros: Di lo que piensas de su situación.
3. El Plan de Acción: 1 o 2 recomendaciones hiper-prácticas adaptadas a lo que SÍ puede comer.
4. El Cierre: Frase motivadora o graciosa.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []).map((m: any) => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        temperature: 0.8,
        max_tokens: 1024,
        top_p: 1,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiContent = data.choices[0].message.content;

    return NextResponse.json({
      success: true,
      response: aiContent,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Hubo un problema con la conexión a Groq.',
      details: error.message
    }, { status: 500 });
  }
}
