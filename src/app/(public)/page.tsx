
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center p-8 border-4 border-dashed border-primary/20 rounded-lg max-w-2xl mx-auto">
        <h1 className="font-headline text-6xl font-bold text-primary">
          Welcome to Easyspark!
        </h1>
        <p className="mt-4 text-xl text-foreground/80">
          Your all-in-one solution for managing your daycare or preschool. Explore the features below.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="font-headline text-2xl text-accent">For Parents</h2>
            <p className="text-muted-foreground mt-2 mb-4">Stay connected with your child's day-to-day activities, view reports, and communicate with teachers.</p>
            <Button asChild className="w-full">
                <Link href="/login">Parent Login</Link>
            </Button>
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="font-headline text-2xl text-accent">For Admins</h2>
            <p className="text-muted-foreground mt-2 mb-4">Manage children, parents, staff, communications, and leverage AI tools to streamline your workflow.</p>
             <Button asChild className="w-full">
                <Link href="/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
