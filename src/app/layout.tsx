
import type { Metadata } from 'next';
import { Poppins, Lilita_One } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/use-auth-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

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
  icons: {
    icon: '/logo.png',
  },
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
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
