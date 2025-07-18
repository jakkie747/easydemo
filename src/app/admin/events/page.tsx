
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { PlusCircle, Calendar, Users, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
    { 
      id: 'evt1', 
      title: 'Spring Fling Festival', 
      date: 'Saturday, May 25, 2024', 
      time: '11:00 AM - 2:00 PM', 
      description: 'Join us for a day of fun, games, food, and crafts to celebrate spring!',
      attendees: 75,
      type: 'Festival'
    },
    { 
      id: 'evt2', 
      title: 'Parent-Teacher Conferences', 
      date: 'June 3-7, 2024', 
      time: 'By Appointment',
      description: 'A dedicated week for parents to meet with teachers and discuss their child\'s progress.',
      attendees: 120,
      type: 'Meeting'
    },
    { 
      id: 'evt3', 
      title: 'Graduation Ceremony', 
      date: 'Friday, August 16, 2024', 
      time: '4:00 PM',
      description: 'Celebrate our preschoolers as they get ready to move on to kindergarten!',
      attendees: 200,
      type: 'Ceremony'
    },
];

export default function EventsPage() {
  return (
     <div className="flex flex-col gap-4">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold">Event Management</h1>
            <p className="text-muted-foreground">Create and manage center-wide events.</p>
        </div>
        <Button>
          <PlusCircle /> Create Event
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
            <Card key={event.id} className="flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <Badge variant="secondary" className="mb-2">{event.type}</Badge>
                            <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                        </div>
                        <div className="flex gap-1">
                             <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                             <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <CardDescription className="flex items-center gap-2 pt-2">
                        <Calendar className="h-4 w-4 text-primary" /> {event.date} at {event.time}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        {event.attendees} attendees expected
                    </div>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
