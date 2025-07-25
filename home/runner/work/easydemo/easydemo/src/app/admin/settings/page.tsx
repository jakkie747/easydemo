
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

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
            <CardTitle>Under Development</CardTitle>
            <CardDescription>Account and data management features will be available here shortly.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Soon, you'll be able to manage your admin profile, change your password, and perform other administrative tasks here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
