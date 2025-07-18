import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ParentsPage() {
  return (
     <div className="flex flex-col gap-4">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold">Parent Management</h1>
            <p className="text-muted-foreground">View and manage parent accounts.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Parent
        </Button>
      </div>
      <Card className="flex flex-col items-center justify-center h-96 border-dashed">
        <CardHeader className="text-center">
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This page is under construction.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
