// frontend/src/app/layout.tsx
import './globals.css'; 
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/src/components/Layout/Header';
import Footer from '@/src/components/Layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DigitalSolusi - Mitra Solusi Digital Anda',
  description: 'Pengembangan web, aplikasi mobile, dan konsultasi IT terdepan di Indonesia.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}