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

    const restriction = await db.dietaryRestriction.findUnique({
      where: { id }
    });

    if (!restriction || restriction.userId !== user.id) {
      return NextResponse.json({ error: 'No tienes permiso o la restricción no existe' }, { status: 403 });
    }

    await db.dietaryRestriction.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Restrictions API] Delete Error:', error.message);
    return NextResponse.json({ error: 'Error al procesar el borrado' }, { status: 500 });
  }
}
