'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get('role');
  const [email, setEmail] = useState('');

  function login() {
    if (!email) {
      alert('Enter email');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ email, role }));
    router.push(role === 'driver' ? '/admin' : '/student');
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">
          {role === 'driver' ? 'Driver Login' : 'Student Login'}
        </h2>
        <input
          className="border p-2 w-full mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}
