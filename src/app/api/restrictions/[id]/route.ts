import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID' }, { status: 400 });
    }

    await db.dietaryRestriction.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Restrictions API] Delete Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
