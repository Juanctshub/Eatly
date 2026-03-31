import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all restrictions
export async function GET() {
  try {
    const restrictions = await db.dietaryRestriction.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(restrictions);
  } catch (error: any) {
    console.error('[Restrictions API] Get Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new restriction
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    if (!data.foodItem) {
      return NextResponse.json({ error: 'Falta el nombre del alimento' }, { status: 400 });
    }

    // Get the first user for now (demo stability)
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: { name: 'Usuario', email: 'user@eatly.app' }
      });
    }

    // AI Categorization
    const { NeuralEngine } = await import('@/lib/neural-engine');
    const category = await NeuralEngine.categorizeFood(data.foodItem);

    const newRestriction = await db.dietaryRestriction.create({
      data: {
        userId: user.id,
        foodItem: data.foodItem,
        reason: data.reason || 'alergia',
        severity: data.severity || 'moderada',
        category: category,
        notes: data.notes || '',
      },
    });

    return NextResponse.json(newRestriction);
  } catch (error: any) {
    console.error('[Restrictions API] Create Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
