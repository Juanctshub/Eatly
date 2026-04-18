import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // 1. Buscar usuario
    const user = await db.user.findUnique({
      where: { email },
      include: {
        preferences: true,
        restrictions: true,
        foods: true,
      }
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // 2. Validar contraseña
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // 3. Retornar perfil completo para hidratar la app
    return NextResponse.json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        goal: user.goal,
        activityLevel: user.activityLevel,
        recentLogs: user.recentLogs,
        preferences: user.preferences,
        restrictions: user.restrictions,
        foods: user.foods
      }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al iniciar sesión' },
      { status: 500 }
    );
  }
}
