import { NextResponse } from 'next/server';
import { zaIWebDevSdk } from 'z-ai-web-dev-sdk';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mealType, availableFoods, restrictions } = body;

    const systemPrompt = `Eres DietAdvisor, un asistente experto en nutrición y alergias alimentarias.
Debes crear exactamente 3 recomendaciones de platillos seguros para un usuario, basándote en la siguiente información:
Tipo de comida: ${mealType || 'Cualquiera'}
Alimentos preferidos/disponibles: ${availableFoods?.map((f: any) => f.name).join(', ') || 'Cualquiera'}
Restricciones y Alergias Críticas: ${restrictions?.map((r: any) => `${r.foodItem} (${r.reason} - ${r.severity})`).join(', ') || 'Ninguna'}

CRÍTICO: No debes incluir NINGÚN ingrediente que esté en la lista de restricciones o alergias.
Retorna las recomendaciones estrictamente en formato JSON como un objeto con esta estructura:
{
  "generalTip": "un consejo corto sobre su dieta",
  "suggestions": [
    {
      "name": "nombre del plato",
      "ingredients": ["ingrediente1", "ingrediente2"],
      "safetyReason": "por qué es seguro según sus restricciones",
      "nutritionalBenefits": "beneficio corto",
      "prepTime": 15,
      "calories": 300,
      "imageEmoji": "🍲"
    }
  ]
}`;

    const { ZAIResponse } = await zaIWebDevSdk({
      userMessage: "Genera las recomendaciones de comida ahora mismo.",
      systemMessage: systemPrompt,
      isAutoFormatEnabled: true,
      autoFormatConstraints: {
         "generalTip": "string",
         "suggestions": [{
            "name": "string",
            "ingredients": ["string"],
            "safetyReason": "string",
            "nutritionalBenefits": "string",
            "prepTime": "number",
            "calories": "number",
            "imageEmoji": "string"
         }]
      }
    });

    try {
      if (typeof ZAIResponse === 'string') {
        const cleaned = ZAIResponse.replace(/```json/g, '').replace(/```/g, '');
        return NextResponse.json(JSON.parse(cleaned));
      }
      return NextResponse.json(ZAIResponse);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return NextResponse.json({
        generalTip: "Aquí tienes algunas ideas seguras basadas en tus alimentos.",
        suggestions: fallbackSuggestions(availableFoods, mealType)
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}

function fallbackSuggestions(foods: any[], mealType: string) {
  const baseFood = foods && foods.length > 0 ? foods[0].name : 'Vegetales';
  return [
    {
      name: `Plato seguro con ${baseFood}`,
      ingredients: [baseFood, 'Sal', 'Especias seguras'],
      safetyReason: 'Ingredientes básicos libres de alérgenos.',
      nutritionalBenefits: 'Ligero y fácil de digerir.',
      prepTime: 10,
      calories: 250,
      imageEmoji: '🍽️'
    }
  ];
}
