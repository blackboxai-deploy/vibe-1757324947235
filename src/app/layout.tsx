import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../components/Auth/AuthProvider';
import { Toaster } from '../components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DocConnect - Online Doctor Consultation Platform',
  description: 'Connect with qualified doctors online for affordable healthcare consultations. Book appointments, get prescriptions, and receive quality medical care from the comfort of your home.',
  keywords: 'online doctor, telemedicine, healthcare, consultation, medical advice, prescription',
  authors: [{ name: 'DocConnect Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'DocConnect - Online Doctor Consultation Platform',
    description: 'Connect with qualified doctors online for affordable healthcare consultations.',
    type: 'website',
    siteName: 'DocConnect',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
          <Toaster 
            position="top-right" 
            richColors 
            closeButton
            toastOptions={{
              duration: 4000,
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}