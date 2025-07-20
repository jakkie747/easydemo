
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { getGalleryImages, getEvents } from '@/lib/firestore';
import type { GalleryImage, Event } from '@/lib/types';

export default async function Home() {
  const allGalleryImages: GalleryImage[] = await getGalleryImages();
  const galleryImages = allGalleryImages.slice(0, 3);

  const allEvents: Event[] = await getEvents();
  const upcomingEvents = allEvents.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary/5 py-8 md:py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">
              Simplify Your Childcare Management
            </h1>
            <p className="mt-4 text-lg text-foreground/80">
              Easyspark is the all-in-one platform to manage your preschool or daycare. Handle registrations, parent communication, and daily reports with ease.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register/preschool">Enroll Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Parent Login</Link>
              </Button>
            </div>
          </div>
          <Image
            src="https://placehold.co/800x600.png"
            data-ai-hint="children playing daycare"
            alt="Children playing happily at the daycare"
            width={800}
            height={600}
            className="rounded-lg aspect-video object-cover mx-auto mt-10 shadow-lg w-full max-w-2xl h-auto"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="programs" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-4xl font-bold text-primary">Our Programs</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">We offer programs designed to nurture and educate children at different stages of their early development.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 border rounded-lg bg-card shadow-md">
              <h3 className="font-headline text-2xl text-accent">Preschool Program</h3>
              <p className="text-muted-foreground mt-2 mb-4">A play-based curriculum focusing on social skills, creativity, and school readiness for children ages 2-5.</p>
              <Button asChild>
                  <Link href="/register/preschool">Learn More & Register</Link>
              </Button>
            </div>
            <div className="p-8 border rounded-lg bg-card shadow-md">
              <h3 className="font-headline text-2xl text-accent">Afterschool Program</h3>
              <p className="text-muted-foreground mt-2 mb-4">Homework help, STEM activities, and fun projects for school-aged children from Kindergarten to 5th grade.</p>
               <Button asChild>
                  <Link href="/register/afterschool">Learn More & Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events and Gallery Section */}
      <section id="latest" className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          
          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary text-center">Upcoming Events</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-center">Stay up to date with our latest activities and gatherings.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => (
                    <Card key={event.id} className="flex flex-col">
                        {event.imageUrl && (
                          <div className="relative w-full h-40">
                              <Image
                                  src={event.imageUrl}
                                  alt={event.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover rounded-t-lg"
                              />
                          </div>
                        )}
                        <CardHeader>
                            <CardTitle className="font-headline text-xl text-accent">{event.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 pt-1"><Calendar className="h-4 w-4"/> {event.date}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{event.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                    <Link href="/admin/events">View All Events <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
          </div>
          
          {/* Gallery */}
          <div>
            <h2 className="font-headline text-4xl font-bold text-primary text-center">From Our Gallery</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto text-center">A glimpse into the daily life and special moments at Easyspark.</p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={image.url}
                    alt={image.description || 'Gallery photo'}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover aspect-video transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
             <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                    <Link href="/admin/gallery">View Full Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
