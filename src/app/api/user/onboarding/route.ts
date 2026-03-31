import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { NeuralEngine } from '@/lib/neural-engine';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const email = req.headers.get('x-user-email');
    if (!email) {
      return NextResponse.json({ error: 'No se pudo identificar al usuario (Falta Header)' }, { status: 401 });
    }

    const body = await req.json();
    const { name, goal, activityLevel, restrictions } = body;

    console.log(`[Onboarding API] Payload para ${email}:`, {
      name: name ? 'SI' : 'NO',
      goal: goal ? 'SI' : 'NO',
      activityNum: restrictions?.length || 0
    });

    if (!name || !goal) {
      return NextResponse.json({ 
        error: `Faltan campos obligatorios: ${!name ? 'Nombre ' : ''}${!goal ? 'Meta' : ''}`, 
        success: false 
      }, { status: 400 });
    }

    // 1. Upsert User Profile
    let userId: string;
    try {
      const updatedUser = await db.user.upsert({
        where: { email },
        update: {
          name,
          goal,
          activityLevel,
          recentLogs: 'Perfil optimizado por Roko'
        },
        create: {
          email,
          name,
          goal,
          activityLevel,
          recentLogs: 'Sesión iniciada'
        }
      });
      userId = updatedUser.id;
    } catch (err: any) {
      console.error('[Onboarding] Error upserting user:', err.message);
      return NextResponse.json({ error: 'Error al guardar el perfil de usuario', details: err.message }, { status: 500 });
    }

    // 2. Handle Preferences
    try {
      await db.userPreferences.upsert({
        where: { userId },
        update: { onboarding: true },
        create: { userId, onboarding: true, theme: 'light' }
      });
    } catch (err: any) {}

    // 3. Save initial restrictions
    if (restrictions && Array.isArray(restrictions) && restrictions.length > 0) {
      try {
        await db.dietaryRestriction.deleteMany({ where: { userId } });
        for (const r of restrictions) {
          if (!r.foodItem) continue;
          let category = 'Otro';
          try { category = await NeuralEngine.categorizeFood(r.foodItem); } catch (e) {}
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
      } catch (err: any) {}
    }

    return NextResponse.json({ success: true, userId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const email = req.headers.get('x-user-email');
    if (!email) {
      return NextResponse.json({ onboarding: false, user: null });
    }

    const user = await db.user.findUnique({
      where: { email },
      include: { preferences: true }
    });
    
    if (!user) {
      return NextResponse.json({ onboarding: false, user: null });
    }

    return NextResponse.json({ 
      onboarding: user.preferences?.onboarding ?? false,
      user: {
        name: user.name,
        email: user.email,
        goal: user.goal,
        activityLevel: user.activityLevel,
        recentLogs: user.recentLogs
      }
    });
  } catch (error: any) {
    return NextResponse.json({ onboarding: false, user: null });
  }
}

