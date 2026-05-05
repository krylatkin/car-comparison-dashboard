import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://car-comparison.example.com'),
  title: {
    default: 'Car Comparison Dashboard',
    template: '%s | Car Comparison Dashboard',
  },
  description:
    'Compare cars by price, rating, type, and specs with an SEO-friendly Next.js dashboard.',
  applicationName: 'Car Comparison Dashboard',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: 'Car Comparison Dashboard',
    description:
      'Compare cars by price, rating, type, and specs with an SEO-friendly Next.js dashboard.',
    url: 'https://car-comparison.example.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Comparison Dashboard',
    description:
      'Compare cars by price, rating, type, and specs with an SEO-friendly Next.js dashboard.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

