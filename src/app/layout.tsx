
import type { Metadata } from 'next';
import { Poppins, Lilita_One } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/use-auth.tsx';

const fontBody = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
});

const fontHeadline = Lilita_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Easyspark Demo',
  description: 'Welcome to Easyspark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body", fontBody.variable, fontHeadline.variable)}>
        <AuthProvider>
            {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
