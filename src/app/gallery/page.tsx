
import { getGalleryImages } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Photo Gallery</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of moments from our classrooms, playgrounds, and special events.
          </p>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={image.url}
                  alt={image.description || "Gallery image"}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                   data-ai-hint="child activity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                  {image.description && (
                     <div className="absolute bottom-0 left-0 p-3 w-full">
                       <p className="text-white text-sm truncate">{image.description}</p>
                     </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
           <div className="text-center text-muted-foreground py-16">
            <h3 className="mt-4 text-lg font-semibold">The Gallery is Empty</h3>
            <p className="mt-2 text-sm">Photos from school activities will appear here soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
