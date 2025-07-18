
"use client"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, ToyBrick, Bed, BookHeart, FilePen, LogOut } from "lucide-react"
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

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
  notes: "Leo was very cheerful today and shared his toys with friends during playtime. Great job, Leo!",
};

export default function ParentDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out.",
      });
    }
  };


  return (
    <div className="bg-muted/40 min-h-screen">
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary"
            >
              <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9L12 16l1.9-4.8 4.8-1.9-4.8-1.9L12 3z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
            <span className="font-headline text-2xl text-primary">Easyspark</span>
          </Link>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-md">
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                  <AvatarImage src="https://i.pravatar.cc/150?u=leo" />
                  <AvatarFallback>LB</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-3xl">Leo Bloom</CardTitle>
                <CardDescription>Preschool - Bumblebees</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                 <Button className="w-full" asChild>
                    <Link href="/parent/profile">
                        <FilePen /> Edit Profile
                    </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Today's Report - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
                 <CardDescription>A summary of Leo's day at Easyspark.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
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
                      <p className="pt-2">Leo napped from <strong>{dailyReport.naps[0].start}</strong> to <strong>{dailyReport.naps[0].end}</strong> ({dailyReport.naps[0].duration}).</p>
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
      </main>
    </div>
  )
}
