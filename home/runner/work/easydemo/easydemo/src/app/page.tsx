
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HomeGalleryPreview } from '@/components/home-gallery-preview';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-headline text-5xl md:text-6xl font-bold text-primary">
                Welcome to Easyspark
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Nurturing bright futures with a blend of care, education, and fun. Your child's journey starts here.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link href="/register">
                    <Sparkles className="mr-2" />
                    Register Your Child
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                   <Link href="/events">
                    View Upcoming Events
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="children playing learning"
                alt="Children playing and learning in a bright, friendly environment"
                width={600}
                height={400}
                className="rounded-lg shadow-xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16">
          <div className="container mx-auto px-4">
               <div className="text-center mb-10">
                    <h2 className="font-headline text-4xl font-bold text-primary">From Our Gallery</h2>
                    <p className="mt-2 text-muted-foreground">A glimpse into our daily adventures and special moments.</p>
                </div>
              <HomeGalleryPreview />
               <div className="text-center mt-10">
                  <Button asChild variant="link">
                      <Link href="/gallery">View Full Gallery <ArrowRight className="ml-2" /></Link>
                  </Button>
              </div>
          </div>
      </section>
    </div>
  );
}
