
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ParentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-headline text-3xl font-bold">Parent Management</h1>
        <p className="text-muted-foreground">
          This feature is coming soon.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Under Development</CardTitle>
            <CardDescription>The ability to view and manage parent accounts will be available here shortly.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Thank you for your patience as we build out this section.</p>
        </CardContent>
      </Card>
    </div>
  );
}
