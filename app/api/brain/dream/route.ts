import { NextRequest, NextResponse } from 'next/server';
import { sendDream } from '@/lib/brain';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, content, priority, tags } = body;

    const result = await sendDream({ type, content, priority, tags });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[brain/dream] POST error:', error);
    return NextResponse.json(
      { error: 'Failed to send dream to Leader Brain' },
      { status: 500 }
    );
  }
}
