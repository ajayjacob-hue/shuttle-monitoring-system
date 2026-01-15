import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shuttle Monitoring System – VIT Vellore',
  description: 'Multi-shuttle real-time monitoring system with geofencing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
