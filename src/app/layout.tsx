
import type { Metadata, Viewport } from 'next';
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

const APP_NAME = "Easyspark Demo";
const APP_DEFAULT_TITLE = "Easyspark | Childcare Management Made Easy";
const APP_TITLE_TEMPLATE = "%s - Easyspark";
const APP_DESCRIPTION = "The all-in-one solution for managing your daycare or preschool.";


export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
   icons: {
    icon: '/logo.png',
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#d4e7f2",
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
