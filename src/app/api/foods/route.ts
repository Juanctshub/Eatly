import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const MASTER_EMAIL = 'roko.master@eatly.app';

// GET all available foods
export async function GET() {
  try {
    const user = await db.user.findUnique({ where: { email: MASTER_EMAIL } });
    if (!user) {
      return NextResponse.json([]);
    }

    const foods = await db.availableFood.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(foods);
  } catch (error: any) {
    console.error('[Foods API] Get Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new available food
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    if (!data.name) {
      return NextResponse.json({ error: 'Falta el nombre del alimento' }, { status: 400 });
    }

    // Get the master user for consistency
    let user = await db.user.findUnique({ where: { email: MASTER_EMAIL } });
    if (!user) {
      user = await db.user.create({
        data: { name: 'Usuario', email: MASTER_EMAIL }
      });
    }

    const newFood = await db.availableFood.create({
      data: {
        userId: user.id,
        name: data.name,
        category: data.category || 'General',
        mealType: data.mealType || 'Desayuno',
      },
    });

    return NextResponse.json(newFood);
  } catch (error: any) {
    console.error('[Foods API] Create Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
