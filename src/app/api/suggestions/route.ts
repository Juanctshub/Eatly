import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let mealType, availableFoods, restrictions, userData;
  
  try {
    const body = await req.json();
    mealType = body.mealType;
    availableFoods = body.availableFoods;
    restrictions = body.restrictions;
    userData = body.userData;

    // Groq configuration
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const MODEL = 'llama-3.3-70b-versatile';

    const systemPrompt = `Eres el Nutriólogo Residente de "Antigravity". Tu estilo es directo, sin filtros, honesto y motivador (Tough Love).

TU MISIÓN: Generar 3 sugerencias de comida para ${userData?.name || 'el usuario'} basadas en su contexto real.

DATOS DINÁMICOS:
- Meta: ${userData?.goal || 'Mantenimiento'}
- Actividad: ${userData?.activityLevel || 'Moderado'}
- Restricciones CRÍTICAS: ${restrictions?.map((r: any) => `${r.foodItem} (${r.reason})`).join(', ') || 'Ninguna'}
- Alimentos que SÍ tiene: ${availableFoods?.map((f: any) => f.name).join(', ') || 'Cualquiera'}
- Momento: ${mealType || 'Cualquiera'}

REGLAS DE ORO:
1. SEGURIDAD TOTAL: Jamás menciones ingredientes prohibidos.
2. PERSONALIDAD: El "generalTip" debe sonar como tú: crudo, divertido y motivador. Nada de sermones aburridos.
3. PRÁCTICO: Sugiere platos reales y fáciles.

Retorna EXACTAMENTE este JSON:
{
  "generalTip": "frase corta con tu personalidad 'sin filtros' sobre su progreso o meta",
  "suggestions": [
    {
      "name": "nombre creativo del plato",
      "ingredients": ["lista", "de", "ingredientes", "seguros"],
      "safetyReason": "explicación de por qué es seguro para sus alergias",
      "nutritionalBenefits": "por qué le sirve para su meta de ${userData?.goal}",
      "prepTime": 15,
      "calories": 350,
      "imageEmoji": "🥘"
    }
  ]
}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Genera las 3 recomendaciones en formato JSON puro ahora.' }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return NextResponse.json(JSON.parse(content));

  } catch (error: any) {
    console.error('Suggestions API Error:', error);
    return NextResponse.json({
      generalTip: "A veces la tecnología falla, pero tus ganas no deben hacerlo. ¡Sigue comiendo sano!",
      suggestions: fallbackSuggestions(availableFoods || [], userData?.goal || 'Salud')
    });
  }
}

function fallbackSuggestions(foods: any[], goal: string) {
  const baseFood = foods && foods.length > 0 ? foods[0].name : 'Proteína magra';
  return [
    {
      name: `Bowl Antigravity con ${baseFood}`,
      ingredients: [baseFood, 'Sal', 'Especias', 'Vegetales verdes'],
      safetyReason: 'Ingredientes básicos controlados.',
      nutritionalBenefits: `Ajustado para tu meta de ${goal || 'salud'}.`,
      prepTime: 10,
      calories: 300,
      imageEmoji: '🥗'
    }
  ];
}
