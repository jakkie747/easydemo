
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
       <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2"><Settings/> Admin Settings</h1>
        <p className="text-muted-foreground">
          Manage your administrator account and preferences.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This feature is currently under development.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Here, you'll be able to manage your profile, change your password, and set notification preferences.</p>
        </CardContent>
      </Card>
    </div>
  );
}
