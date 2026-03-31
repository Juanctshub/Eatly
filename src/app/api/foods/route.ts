import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET all available foods
export async function GET(req: NextRequest) {
  try {
    const email = req.headers.get('x-user-email');
    if (!email) return NextResponse.json([]);

    const user = await db.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json([]);

    const foods = await db.availableFood.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(foods);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new available food
export async function POST(req: NextRequest) {
  try {
    const email = req.headers.get('x-user-email');
    if (!email) return NextResponse.json({ error: 'No user email' }, { status: 401 });

    const data = await req.json();
    if (!data.name) return NextResponse.json({ error: 'Falta el nombre' }, { status: 400 });

    let user = await db.user.findUnique({ where: { email } });
    if (!user) {
      user = await db.user.create({ data: { name: 'Usuario', email } });
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
