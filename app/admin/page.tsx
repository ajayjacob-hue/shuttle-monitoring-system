'use client';

import { useRef, useState } from 'react';

export default function AdminPage() {
  const [shuttleId, setShuttleId] = useState('BUS-1');
  const [status, setStatus] = useState('Paused');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  async function sendLocation(isLive: boolean) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch('/api/shuttle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              shuttleId,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              isLive,
            }),
          });

          // ✅ SAFE parsing (no crash)
          const text = await res.text();

          if (!text) {
            setStatus(isLive ? 'Live' : 'Paused');
            return;
          }

          const data = JSON.parse(text);
          setStatus(data.insideCampus && isLive ? 'Live' : 'Paused');
        } catch {
          setStatus('Network Error');
        }
      },
      () => {
        setStatus('GPS Permission Denied');
      }
    );
  }

  function startLive() {
    if (intervalRef.current) return;

    sendLocation(true); // send immediately
    intervalRef.current = setInterval(() => {
      sendLocation(true);
    }, 4000);
  }

  function stopLive() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    sendLocation(false); // notify backend
    setStatus('Paused');
  }

  return (
    <main className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-4">Driver / Admin Dashboard</h2>

      <input
        className="border p-2 mb-4"
        value={shuttleId}
        onChange={(e) => setShuttleId(e.target.value)}
        placeholder="Shuttle ID (BUS-1)"
      />

      <div className="flex gap-4 mb-4">
        <button
          onClick={startLive}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Start Live
        </button>

        <button
          onClick={stopLive}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Stop Live
        </button>
      </div>

      <p>
        Status: <strong>{status}</strong>
      </p>
    </main>
  );
}
