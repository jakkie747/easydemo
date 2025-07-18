import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-muted/40">
            {children}
        </main>
        <Footer />
    </div>
  );
}
