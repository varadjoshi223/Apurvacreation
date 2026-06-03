import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CursorSpotlight from '@/components/ui/CursorSpotlight';

export const metadata: Metadata = {
  title: 'Apurva Creation | Creative Design Agency',
  description:
    'Apurva Creation is a premium creative design agency specializing in logo design, banner design, poster design, book cover design, photo editing, video editing, and more.',
  keywords: [
    'graphic design',
    'logo design',
    'banner design',
    'creative agency',
    'Apurva Creation',
    'poster design',
    'video editing',
    'luxury design',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SmoothScroll>
          <CursorSpotlight />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
