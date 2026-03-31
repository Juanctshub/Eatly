import { NextResponse } from 'next/server';
import { NeuralEngine } from '@/lib/neural-engine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mealType, availableFoods, restrictions, userData } = body;

    console.log('--- NeuralEngine Suggestions Request ---');
    const suggestions = await NeuralEngine.getSuggestions({
      mealType,
      foods: availableFoods,
      restrictions,
      userData
    });

    return NextResponse.json(suggestions);

  } catch (error: any) {
    console.error('NeuralEngine Suggestions API Error:', error);
    
    // Fallback static suggestions if everything fails
    return NextResponse.json({
      generalTip: "A veces la tecnología falla, pero tus ganas no deben hacerlo. ¡Sigue comiendo sano!",
      suggestions: [
        {
          name: "Bowl Antigravity Clásico",
          ingredients: ["Proteína magra", "Sal", "Vegetales mixtos"],
          safetyReason: "Ingredientes básicos controlados.",
          nutritionalBenefits: "Balanceado para tu meta actual.",
          prepTime: 10,
          calories: 300,
          imageEmoji: "🥗"
        }
      ]
    });
  }
}
