
import { getChild } from "@/lib/firestore";
import type { Child } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Utensils, ToyBrick, Bed, BookHeart, ArrowLeft } from "lucide-react";


const dailyReport = {
  activities: [
    { time: "9:30 AM", description: "Circle time: sang 'The Wheels on the Bus' and talked about the weather." },
    { time: "10:15 AM", description: "Arts & Crafts: painted with watercolors to create beautiful spring pictures." },
    { time: "11:00 AM", description: "Outdoor Play: enjoyed the sunshine and played in the sandbox." },
  ],
  meals: [
    { time: "12:00 PM", meal: "Lunch", items: "Chicken nuggets, steamed carrots, apple slices, and milk.", ate: "Ate most of it" },
    { time: "2:30 PM", meal: "Snack", items: "Yogurt and graham crackers.", ate: "Ate all of it" },
  ],
  naps: [
    { start: "1:00 PM", end: "2:15 PM", duration: "1h 15m" },
  ],
  notes: "Was very cheerful today and shared toys with friends during playtime. Great job!",
};

export default async function ChildReportPage({ params }: { params: { id: string } }) {
  const child: Child | null = await getChild(params.id);

  if (!child) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
        <div className="mb-2">
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin/children">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Children
                </Link>
            </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-md">
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                  <AvatarImage src={child.avatar} alt={child.name} />
                  <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-3xl">{child.name}</CardTitle>
                <CardDescription>{child.classroom}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p>Age: {child.age}</p>
                <p>Parent: {child.parent}</p>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Today's Report - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
                 <CardDescription>A summary of {child.name.split(' ')[0]}'s day at Easyspark.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3", "item-4"]} className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold"><ToyBrick className="mr-2 text-accent" />Activities</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4 pt-2 pl-6 border-l-2 border-accent">
                         {dailyReport.activities.map((act, i) => (
                           <li key={i} className="relative pl-4">
                             <div className="absolute -left-3.5 top-1 w-6 h-6 bg-background border-2 border-accent rounded-full"></div>
                             <p className="font-semibold text-muted-foreground">{act.time}</p>
                             <p>{act.description}</p>
                           </li>
                         ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold"><Utensils className="mr-2 text-accent" />Meals</AccordionTrigger>
                    <AccordionContent>
                       <ul className="space-y-4 pt-2">
                         {dailyReport.meals.map((meal, i) => (
                          <li key={i} className="p-3 bg-secondary/50 rounded-lg">
                            <p className="font-bold">{meal.meal} <span className="font-normal text-muted-foreground">at {meal.time}</span></p>
                            <p className="pl-2">{meal.items}</p>
                            <p className="pl-2 text-sm text-primary">Notes: {meal.ate}</p>
                          </li>
                         ))}
                       </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-semibold"><Bed className="mr-2 text-accent" />Naps</AccordionTrigger>
                    <AccordionContent>
                      <p className="pt-2">{child.name.split(' ')[0]} napped from <strong>{dailyReport.naps[0].start}</strong> to <strong>{dailyReport.naps[0].end}</strong> ({dailyReport.naps[0].duration}).</p>
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-semibold"><BookHeart className="mr-2 text-accent" />Notes from Teacher</AccordionTrigger>
                    <AccordionContent>
                      <blockquote className="mt-2 border-l-4 border-accent pl-4 italic">"{dailyReport.notes}"</blockquote>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}
