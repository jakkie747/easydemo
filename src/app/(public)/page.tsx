import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center p-8 border-4 border-dashed border-green-500 rounded-lg">
        <h1 className="font-headline text-6xl font-bold text-green-600">
          It Works!
        </h1>
        <p className="mt-4 text-xl text-foreground/80">
          The build was successful. Your application is now deployed.
        </p>
        <p className="mt-2 text-muted-foreground">
          You can now start re-adding your features and pages.
        </p>
      </div>
    </div>
  );
}
