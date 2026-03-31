import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET all restrictions
export async function GET(req: NextRequest) {
  try {
    const email = req.headers.get('x-user-email');
    if (!email) return NextResponse.json([]);

    let user = await db.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json([]);

    const restrictions = await db.dietaryRestriction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(restrictions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new restriction
export async function POST(req: NextRequest) {
  try {
    const email = req.headers.get('x-user-email');
    if (!email) return NextResponse.json({ error: 'No user email' }, { status: 401 });

    const data = await req.json();
    if (!data.foodItem) return NextResponse.json({ error: 'Falta el nombre' }, { status: 400 });

    let user = await db.user.findUnique({ where: { email } });
    if (!user) {
      user = await db.user.create({ data: { name: 'Usuario', email } });
    }

    const { NeuralEngine } = await import('@/lib/neural-engine');
    const category = await NeuralEngine.categorizeFood(data.foodItem);

    const newRestriction = await db.dietaryRestriction.create({
      data: {
        userId: user.id,
        foodItem: data.foodItem,
        reason: data.reason || 'alergia',
        severity: data.severity || 'moderada',
        category,
        notes: data.notes || '',
      },
    });

    return NextResponse.json(newRestriction);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
