import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Task Manager',
  description: 'A production-ready student task manager built with Next.js and deployed on Vercel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
