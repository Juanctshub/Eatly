import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { NeuralEngine } from '@/lib/neural-engine';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { name, goal, activityLevel, restrictions } = await req.json();

    if (!name || !goal) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    // Hardened Identity: Always use the same master user for this demo
    const MASTER_EMAIL = 'roko.master@eatly.app';
    
    // 1. Upsert User Profile
    console.log('[Onboarding] Sincronizando perfil para:', MASTER_EMAIL);
    let userId: string;
    try {
      const updatedUser = await db.user.upsert({
        where: { email: MASTER_EMAIL },
        update: {
          name,
          goal,
          activityLevel,
          recentLogs: 'Perfil optimizado por Roko'
        },
        create: {
          email: MASTER_EMAIL,
          name,
          goal,
          activityLevel,
          recentLogs: 'Sesión iniciada'
        }
      });
      userId = updatedUser.id;
      console.log('[Onboarding] Perfil guardado con ID:', userId);
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
    } catch (err: any) {
      console.error('[Onboarding] Error upserting preferences:', err.message);
      // No bloqueamos por esto, pero lo logueamos
    }

    // 3. Save initial restrictions with AI categorization
    if (restrictions && Array.isArray(restrictions) && restrictions.length > 0) {
      console.log(`[Onboarding] Procesando ${restrictions.length} restricciones...`);
      try {
        // Clear previous restrictions for this master user
        await db.dietaryRestriction.deleteMany({ where: { userId } });

        for (const r of restrictions) {
          if (!r.foodItem) continue;
          
          let category = 'Otro';
          try {
            category = await NeuralEngine.categorizeFood(r.foodItem);
          } catch (e) {
            console.warn(`[Onboarding] Falló la categorización de "${r.foodItem}", ignorando...`);
          }
          
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
        console.log('[Onboarding] Restricciones guardadas exitosamente.');
      } catch (err: any) {
        console.error('[Onboarding] Error saving restrictions:', err.message);
      }
    }

    return NextResponse.json({ success: true, userId });
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

