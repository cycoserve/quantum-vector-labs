import { NextResponse } from 'next/server';
import { getBrainState } from '@/lib/brain';

export async function GET() {
  try {
    const result = await getBrainState();
    return NextResponse.json(result);
  } catch (error) {
    console.error('[brain/state] GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brain state' },
      { status: 500 }
    );
  }
}
