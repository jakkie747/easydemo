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
import { Utensils, ToyBrick, Bed, BookHeart, FilePen } from "lucide-react"

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
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-headline text-2xl">Parent Dashboard</h1>
          <Button variant="secondary" asChild><Link href="/">Logout</Link></Button>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="https://i.pravatar.cc/150?u=leo" />
                  <AvatarFallback>LB</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-3xl">Leo Bloom</CardTitle>
                <CardDescription>Preschool - Bumblebees</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                 <Button className="w-full" asChild>
                    <Link href="/parent/profile">
                        <FilePen className="mr-2 h-4 w-4" /> Edit Profile
                    </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Today's Report - {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
                 <CardDescription>A summary of Leo's day at Easyspark.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold"><ToyBrick className="mr-2 text-accent" />Activities</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4 pl-6 border-l">
                         {dailyReport.activities.map((act, i) => (
                           <li key={i} className="relative">
                             <Badge className="absolute -left-5 top-1">{act.time}</Badge>
                             <p>{act.description}</p>
                           </li>
                         ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-semibold"><Utensils className="mr-2 text-accent" />Meals</AccordionTrigger>
                    <AccordionContent>
                       <ul className="space-y-4">
                         {dailyReport.meals.map((meal, i) => (
                          <li key={i}>
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
                      <p>Leo napped from <strong>{dailyReport.naps[0].start}</strong> to <strong>{dailyReport.naps[0].end}</strong> ({dailyReport.naps[0].duration}).</p>
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-semibold"><BookHeart className="mr-2 text-accent" />Notes from Teacher</AccordionTrigger>
                    <AccordionContent>
                      <p className="italic text-muted-foreground">"{dailyReport.notes}"</p>
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
