import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, goal, activityLevel, restrictions } = await req.json();

    if (!name || !goal) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Get or Create User
    let user = await db.user.findFirst();
    if (!user) {
      user = await db.user.create({
        data: { name, email: 'user@eatly.app' }
      });
    }

    // Update User Profile basics
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        name,
        goal,
        activityLevel,
        recentLogs: 'Camino con Eatly iniciado'
      }
    });

    // Handle Preferences separately for stability
    const existingPrefs = await db.userPreferences.findUnique({
      where: { userId: user.id }
    });

    if (existingPrefs) {
      await db.userPreferences.update({
        where: { id: existingPrefs.id },
        data: { onboarding: true }
      });
    } else {
      await db.userPreferences.create({
        data: { userId: user.id, onboarding: true, theme: 'light' }
      });
    }

    // Save initial restrictions
    if (restrictions && Array.isArray(restrictions) && restrictions.length > 0) {
      // Use individual creates if createMany has issues with SQLite in this environment
      for (const r of restrictions) {
        await db.dietaryRestriction.create({
          data: {
            userId: user.id,
            foodItem: r.foodItem,
            reason: r.reason || 'alergia',
            severity: r.severity || 'moderada',
            notes: 'Onboarding'
          }
        });
      }
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.error('[Onboarding API Critical Error]:', error.message);
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
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
