
"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function RegistrationSelectionPage() {
  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Join the Easyspark Family</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're excited to have you with us! Please select the program you wish to register for.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-primary">Preschool Program</CardTitle>
              <CardDescription>
                For children ages 2-5. A play-based curriculum focusing on social skills, creativity, and school readiness.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" size="lg">
                <Link href="/register/preschool">
                  Register for Preschool <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-primary">Afterschool Program</CardTitle>
              <CardDescription>
                For school-aged children (K-5). Homework help, STEM activities, and fun projects in a supportive environment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" size="lg">
                <Link href="/register/afterschool">
                  Register for Afterschool <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
