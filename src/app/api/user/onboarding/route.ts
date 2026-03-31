import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, goal, activityLevel, restrictions } = await req.json();

    if (!name || !goal) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // In this MVP we work with a single user (the first one or a default one)
    // In a real app we'd use getSession() from NextAuth
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: { name, email: 'user@eatly.app' }
      });
    }

    // Update user profile
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name,
        goal,
        activityLevel,
        recentLogs: 'Iniciando mi camino con Eatly',
        preferences: {
          upsert: {
            create: { onboarding: true, theme: 'light' },
            update: { onboarding: true }
          }
        }
      }
    });

    // Save initial restrictions
    if (restrictions && Array.isArray(restrictions) && restrictions.length > 0) {
      await db.dietaryRestriction.createMany({
        data: restrictions.map((r: any) => ({
          userId: user?.id,
          foodItem: r.foodItem,
          reason: r.reason || 'alergia',
          severity: r.severity || 'moderada',
          notes: 'Configurado en onboarding'
        }))
      });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.error('[Onboarding API] Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET onboarding status
export async function GET() {
  try {
    const preferences = await db.userPreferences.findFirst();
    return NextResponse.json({ onboarding: preferences?.onboarding || false });
  } catch (error: any) {
    return NextResponse.json({ onboarding: false });
  }
}
