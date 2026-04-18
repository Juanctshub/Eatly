import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const email = req.headers.get('x-user-email');

    // Robust Ownership Check
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const food = await db.availableFood.findUnique({
      where: { id }
    });

    if (!food || food.userId !== user.id) {
      return NextResponse.json({ error: 'No tienes permiso o el alimento no existe' }, { status: 403 });
    }

    await db.availableFood.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Foods API] Delete Error:', error.message);
    return NextResponse.json({ error: 'Error al procesar el borrado' }, { status: 500 });
  }
}
