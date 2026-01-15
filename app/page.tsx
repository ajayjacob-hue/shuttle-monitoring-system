import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">🚍 Shuttle Monitoring System</h1>
      <p className="text-gray-600">VIT Vellore Campus</p>
      <div className="flex gap-4">
        <Link
          href="/login?role=driver"
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Driver / Admin
        </Link>
        <Link
          href="/login?role=student"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Student
        </Link>
      </div>
    </main>
  );
}
