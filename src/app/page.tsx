import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center p-8 border-4 border-dashed border-green-500 rounded-lg">
        <h1 className="text-6xl font-bold text-green-600">
          It Works!
        </h1>
        <p className="mt-4 text-xl text-foreground/80">
          Your application has been deployed successfully.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
            <Button asChild>
                <Link href="/login">Parent Login</Link>
            </Button>
            <Button asChild variant="secondary">
                <Link href="/login">Admin Login</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
