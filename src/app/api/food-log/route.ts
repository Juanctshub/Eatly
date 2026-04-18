import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { userId, name, calories, proteins, fats, carbs, mealType, imageEmoji } = await req.json();

    if (!userId || !name || !mealType) {
      return NextResponse.json(
        { error: 'Datos incompletos para el registro de comida' },
        { status: 400 }
      );
    }

    const log = await db.foodLog.create({
      data: {
        userId,
        name,
        calories: calories ? Math.round(calories) : null,
        proteins: proteins ? parseFloat(proteins.toString()) : null,
        fats: fats ? parseFloat(fats.toString()) : null,
        carbs: carbs ? parseFloat(carbs.toString()) : null,
        mealType,
        imageEmoji
      }
    });

    return NextResponse.json(log);

  } catch (error: any) {
    console.error('FoodLog error:', error);
    return NextResponse.json(
      { error: 'Error al registrar el alimento en el diario' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'UserId requerido' }, { status: 400 });
    }

    const logs = await db.foodLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el diario' }, { status: 500 });
  }
}
