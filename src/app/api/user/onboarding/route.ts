import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { NeuralEngine } from '@/lib/neural-engine';

export async function POST(req: NextRequest) {
  try {
    const { name, goal, activityLevel, restrictions } = await req.json();

    if (!name || !goal) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Hardened Identity: Always use the same master user for this demo
    const MASTER_EMAIL = 'roko.master@eatly.app';
    
    // Upsert User Profile
    const updatedUser = await db.user.upsert({
      where: { email: MASTER_EMAIL },
      update: {
        name,
        goal,
        activityLevel,
        recentLogs: 'Camino con Eatly iniciado'
      },
      create: {
        email: MASTER_EMAIL,
        name,
        goal,
        activityLevel,
        recentLogs: 'Sesión iniciada'
      }
    });

    const userId = updatedUser.id;

    // Handle Preferences
    await db.userPreferences.upsert({
      where: { userId },
      update: { onboarding: true },
      create: { userId, onboarding: true, theme: 'light' }
    });

    // Save initial restrictions with AI categorization
    if (restrictions && Array.isArray(restrictions) && restrictions.length > 0) {
      // Clear previous restrictions for this master user to avoid duplicates on re-onboarding
      await db.dietaryRestriction.deleteMany({ where: { userId } });

      for (const r of restrictions) {
        const category = await NeuralEngine.categorizeFood(r.foodItem);
        
        await db.dietaryRestriction.create({
          data: {
            userId,
            foodItem: r.foodItem,
            reason: r.reason || 'alergia',
            severity: r.severity || 'moderada',
            category: category,
            notes: 'Configurado en onboarding'
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

// GET onboarding status and profile data
export async function GET() {
  try {
    const MASTER_EMAIL = 'roko.master@eatly.app';
    const user = await db.user.findUnique({
      where: { email: MASTER_EMAIL },
      include: { preferences: true }
    });
    
    return NextResponse.json({ 
      onboarding: user?.preferences?.onboarding || false,
      user: user ? {
        name: user.name,
        email: user.email,
        goal: user.goal,
        activityLevel: user.activityLevel,
        recentLogs: user.recentLogs
      } : null
    });
  } catch (error: any) {
    console.error('[Onboarding GET Error]:', error.message);
    return NextResponse.json({ onboarding: false, user: null });
  }
}

