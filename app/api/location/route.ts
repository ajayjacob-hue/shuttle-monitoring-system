import { NextResponse } from 'next/server';

let location = {
  lat: 0,
  lng: 0,
  updatedAt: new Date().toISOString(),
};

export async function POST(req: Request) {
  const body = await req.json();
  location = { ...body, updatedAt: new Date().toISOString() };
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(location);
}
