'use client';

import { useEffect, useState } from 'react';

type Shuttle = {
  shuttleId: string;
  lat: number;
  lng: number;
  isLive: boolean;
  updatedAt: string;
};

export default function StudentPage() {
  const [shuttles, setShuttles] = useState<Shuttle[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/shuttle');
        const text = await res.text();

        if (!text) {
          setError('No shuttle data yet');
          setShuttles([]);
          return;
        }

        const json = JSON.parse(text);
        const list = Object.values(json || {});

        if (list.length === 0) {
          setError('No shuttle data yet');
          setShuttles([]);
          return;
        }

        setError('');
        setShuttles(list as Shuttle[]);
      } catch {
        setError('Waiting for shuttle data...');
        setShuttles([]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Live Shuttle Map</h2>

      {error && <p className="text-gray-600 mb-4">{error}</p>}

      {shuttles.length > 0 && (
        <>
          <ul className="mb-4">
            {shuttles.map((s) => (
              <li key={s.shuttleId}>
                🚍 {s.shuttleId} — {s.isLive ? 'Live' : 'Last Known'}
              </li>
            ))}
          </ul>

          <iframe
            width="100%"
            height="500"
            src={`https://www.openstreetmap.org/export/embed.html?layer=mapnik${shuttles
              .map(
                (s) =>
                  `&marker=${encodeURIComponent(
                    `${s.lat},${s.lng}`
                  )}`
              )
              .join('')}`}
          />
        </>
      )}
    </main>
  );
}
