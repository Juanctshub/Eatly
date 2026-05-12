import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const email = req.headers.get('x-user-email');
    const { userId: bodyUserId, name, calories, proteins, fats, carbs, mealType, imageEmoji } = await req.json();

    let user;
    if (email) {
      user = await db.user.findUnique({ where: { email } });
    }
    
    const finalUserId = user?.id || bodyUserId;

    if (!finalUserId || !name || !mealType) {
      return NextResponse.json(
        { error: 'Datos incompletos para el registro de comida' },
        { status: 400 }
      );
    }

    const log = await db.foodLog.create({
      data: {
        userId: finalUserId,
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
    const email = req.headers.get('x-user-email');
    let user;
    
    if (email) {
      user = await db.user.findUnique({ where: { email } });
    } else {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('userId');
      if (userId) {
        user = await db.user.findUnique({ where: { id: userId } });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'UserId o email requerido' }, { status: 400 });
    }

    const logs = await db.foodLog.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener el diario' }, { status: 500 });
  }
}
