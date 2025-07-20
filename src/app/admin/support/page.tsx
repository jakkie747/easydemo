"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2"><LifeBuoy /> Support</h1>
        <p className="text-muted-foreground">
          Get help and find answers to your questions.
        </p>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <p>If you need assistance, please reach out to our support team.</p>
            <p><strong>Email:</strong> support@easyspark.example.com</p>
            <p><strong>Phone:</strong> 1-800-555-1234</p>
        </CardContent>
      </Card>
    </div>
  );
}
