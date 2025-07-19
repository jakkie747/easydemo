
import type { Metadata } from 'next';
import { Poppins, Lilita_One } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { AuthProvider } from '@/hooks/use-auth.tsx';

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const fontLilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lilita-one',
});

export const metadata: Metadata = {
  title: 'Easyspark | Childcare Management Made Easy',
  description: 'The all-in-one solution for managing your daycare or preschool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontPoppins.variable,
          fontLilitaOne.variable
        )}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
