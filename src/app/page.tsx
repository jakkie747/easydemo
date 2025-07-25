
"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getGalleryImages } from '@/lib/firestore';
import type { GalleryImage } from '@/lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function RecentGalleryItems() {
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const fetchedImages = (await getGalleryImages()).slice(0, 3);
            setImages(fetchedImages);
        } catch (error) {
            console.error("Failed to fetch gallery items:", error);
        } finally {
            setIsLoading(false);
        }
    }
    fetchImages();
  }, []);


  if (isLoading) {
      return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          </div>
      )
  }

  if (images.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>The gallery is currently empty. Check back soon for photos of our activities!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden group">
          <div className="relative aspect-[4/3]">
            <Image
              src={image.url}
              alt={image.description || 'School activity'}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="child activity"
            />
          </div>
          {image.description && (
             <CardContent className="p-4">
                <p className="text-sm text-muted-foreground truncate">{image.description}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}

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
              <RecentGalleryItems />
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
