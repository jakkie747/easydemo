
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

// Mock data
const galleryImages = [
    { id: 'img1', src: 'https://placehold.co/400x300.png', alt: 'Children painting', hint: 'children painting' },
    { id: 'img2', src: 'https://placehold.co/400x300.png', alt: 'Outdoor playtime', hint: 'kids playground' },
    { id: 'img3', src: 'https://placehold.co/400x300.png', alt: 'Story time circle', hint: 'teacher reading' },
    { id: 'img4', src: 'https://placehold.co/400x300.png', alt: 'Building with blocks', hint: 'kids blocks' },
    { id: 'img5', src: 'https://placehold.co/400x300.png', alt: 'Science experiment', hint: 'children science' },
    { id: 'img6', src: 'https://placehold.co/400x300.png', alt: 'Snack time', hint: 'children eating' },
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">Manage and upload photos to the gallery.</p>
        </div>
        <Button>
          <PlusCircle /> Add Photo
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <Card key={image.id} className="group relative overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.hint}
              width={400}
              height={300}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors">
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete Photo</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
