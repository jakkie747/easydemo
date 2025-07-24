
import { getEvents } from "@/lib/firestore";
import type { Event } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="py-12 md:py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Upcoming Events</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Join us for our upcoming community events. We look forward to seeing you there!
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {event.imageUrl && (
                  <div className="relative w-full h-56">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint="school event"
                    />
                  </div>
                )}
                <CardHeader>
                   <Badge variant="secondary" className="mb-2 w-fit">{event.type}</Badge>
                  <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground gap-4 pt-2">
                    <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> {event.date}</div>
                    <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> {event.attendees} expected</div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-16">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold">No Upcoming Events</h3>
            <p className="mt-2 text-sm">Please check back soon for our event schedule.</p>
          </div>
        )}
      </div>
    </div>
  );
}
