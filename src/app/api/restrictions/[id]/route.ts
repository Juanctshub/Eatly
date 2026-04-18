import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const email = req.headers.get('x-user-email');

    if (!id || !email) {
      return NextResponse.json({ error: 'Falta el ID o el Email de usuario' }, { status: 400 });
    }

    // Verify ownership before deleting
    const restriction = await db.dietaryRestriction.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!restriction || (restriction.user && restriction.user.email !== email)) {
      return NextResponse.json({ error: 'No tienes permiso para borrar esta restricción' }, { status: 403 });
    }

    await db.dietaryRestriction.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Restrictions API] Delete Error:', error.message);
    return NextResponse.json({ error: 'Error del servidor al borrar' }, { status: 500 });
  }
}
