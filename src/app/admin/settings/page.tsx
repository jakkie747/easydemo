"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Database, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { seedDatabase } from "@/lib/seed";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DatabaseSeeder() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const result = await seedDatabase();
      if (result.success) {
        toast({
          title: "Database Seeded!",
          description: `${result.count} documents were added. The app will now refresh.`,
        });
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Seeding Failed",
          description: result.message,
        });
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: "An unexpected error occurred.",
      });
    } finally {
        setIsSeeding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Management</CardTitle>
        <CardDescription>
          Use this to populate your database with initial sample data. This is useful for development and demonstration.
        </CardDescription>
      </CardHeader>
      <CardContent>
         <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={isSeeding}>
                    {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                    Seed Database
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will add sample teachers, children, and parents to the database. It will not overwrite existing data with the same ID, but it may create duplicates if run multiple times after manual changes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSeed} disabled={isSeeding}>
                        {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Proceed"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}


export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2"><Settings/> Admin Settings</h1>
        <p className="text-muted-foreground">
          Manage your administrator account and application data.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>This feature is currently under development.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Soon, you'll be able to manage your admin profile and change your password here.</p>
        </CardContent>
      </Card>
      <DatabaseSeeder />
    </div>
  );
}
