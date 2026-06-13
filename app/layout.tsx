import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import './globals.css';

/* Font Configuration */
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

/* Metadata */
export const metadata: Metadata = {
  title: 'Raxel Media | Creative That Converts',
  description:
    'Premium direct-response creative agency. We craft campaigns that drive real results and genuine engagement for ambitious brands.',
  keywords: [
    'creative agency',
    'direct response',
    'digital marketing',
    'brand strategy',
    'content creation',
  ],
  authors: [
    {
      name: 'Raxel Media',
      url: 'https://raxelmedia.com',
    },
  ],
  creator: 'Raxel Media',
  publisher: 'Raxel Media',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raxelmedia.com',
    title: 'Raxel Media | Creative That Converts',
    description:
      'Premium direct-response creative agency. We craft campaigns that drive real results and genuine engagement for ambitious brands.',
    siteName: 'Raxel Media',
    images: [
      {
        url: 'https://raxelmedia.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Raxel Media',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raxel Media | Creative That Converts',
    description:
      'Premium direct-response creative agency. We craft campaigns that drive real results and genuine engagement for ambitious brands.',
    images: ['https://raxelmedia.com/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SmoothScrollProvider>
          {/* Navigation */}
          <Navbar />

          {/* Grain Texture Overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-50 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Main Content */}
          <div className="relative z-0">{children}</div>

          {/* Footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
