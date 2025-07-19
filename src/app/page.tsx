
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
    // Since this is a demo, we will just redirect to the public page.
    // In a real app, you might have a landing page here.
    redirect('/login');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-blue-600">
          Redirecting...
        </h1>
        <p className="mt-4 text-xl text-gray-700">
          If you are not redirected, please click the button below.
        </p>
        <Button asChild className="mt-4">
            <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    </div>
  );
}
