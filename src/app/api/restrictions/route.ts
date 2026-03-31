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

    const newRestriction = await db.dietaryRestriction.create({
      data: {
        foodItem: data.foodItem,
        reason: data.reason || 'alergia',
        severity: data.severity || 'moderada',
        notes: data.notes || '',
      },
    });

    return NextResponse.json(newRestriction);
  } catch (error: any) {
    console.error('[Restrictions API] Create Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
