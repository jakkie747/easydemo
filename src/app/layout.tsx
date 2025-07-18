
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth.tsx";

export const metadata: Metadata = {
  title: 'Easyspark Demo',
  description: 'Nurturing bright futures, one spark at a time.',
  manifest: '/manifest.json',
  themeColor: '#D4E7F2',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="font-body antialiased">
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
      </body>
    </html>
  );
}
