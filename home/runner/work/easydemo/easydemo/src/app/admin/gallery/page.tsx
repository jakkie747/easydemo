
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-headline text-3xl font-bold">Gallery Management</h1>
        <p className="text-muted-foreground">
          This feature is coming soon.
        </p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Under Development</CardTitle>
            <CardDescription>The ability to manage the photo gallery will be available here shortly.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Thank you for your patience as we build out this section.</p>
        </CardContent>
      </Card>
    </div>
  );
}
