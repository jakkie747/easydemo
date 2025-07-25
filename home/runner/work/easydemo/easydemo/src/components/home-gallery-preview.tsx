
"use client";

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { getGalleryImages } from '@/lib/firestore';
import type { GalleryImage } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function HomeGalleryPreview() {
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
