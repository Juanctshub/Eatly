import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: 'Email y nueva contraseña son requeridos' },
        { status: 400 }
      );
    }

    // 1. Verificar si el usuario existe
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'No se encontró ninguna cuenta asociada a este correo' },
        { status: 404 }
      );
    }

    // 2. Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Actualizar contraseña
    await db.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    return NextResponse.json({
      message: 'Contraseña actualizada con éxito'
    });

  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al restablecer contraseña' },
      { status: 500 }
    );
  }
}
