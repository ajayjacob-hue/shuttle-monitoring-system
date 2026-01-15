import { NextResponse } from 'next/server';

const VIT_CENTER = { lat: 12.9692, lng: 79.1559 };
const BUFFER_RADIUS = 1.8; // km

function distanceKm(a: any, b: any) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

let shuttles: Record<string, any> = {};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const shuttleId = searchParams.get('shuttleId');

  if (!shuttleId) {
    return NextResponse.json(shuttles);
  }

  const shuttle = shuttles[shuttleId];

  if (!shuttle) {
    return NextResponse.json({
      exists: false,
      message: 'No data for this shuttle yet',
    });
  }

  return NextResponse.json({
    exists: true,
    ...shuttle,
  });
}
