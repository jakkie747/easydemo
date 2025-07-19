
"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Trash2, Loader2, ImagePlus } from "lucide-react";
import type { GalleryImage } from "@/lib/types";
import { useUpload } from "@/hooks/use-upload";
import { useToast } from "@/hooks/use-toast";
import { addGalleryImage } from "@/lib/firestore";
import { deleteGalleryImage } from "@/lib/firebase-server";

const formSchema = z.object({
  description: z.string().optional(),
});

function UploadDialog({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { upload, progress, isLoading: isUploading } = useUpload();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: "" },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      toast({ variant: "destructive", title: "No file selected." });
      return;
    }

    const storagePath = `gallery/${Date.now()}_${file.name}`;
    const uploadedURL = await upload(file, storagePath);

    if (uploadedURL) {
      await addGalleryImage({
        url: uploadedURL,
        description: values.description,
        storagePath: storagePath,
      });

      toast({ title: "Upload Successful!", description: `${file.name} has been added to the gallery.` });
      form.reset();
      setFile(null);
      setIsOpen(false);
      onUploadComplete();
    } else {
      toast({ variant: "destructive", title: "Upload Failed", description: "Could not upload the file. Please try again." });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Add Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Photo to the Gallery</DialogTitle>
          <DialogDescription>
            Select an image and add an optional description.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file">Image File</Label>
              <Input id="file" type="file" accept="image/*" onChange={handleFileChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" placeholder="e.g., Children playing during our Spring Fling event." {...form.register("description")} />
            </div>
            {isUploading && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Uploading... {Math.round(progress)}%</p>
                <Progress value={progress} />
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isUploading || !file}>
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function GalleryClient({ initialImages }: { initialImages: GalleryImage[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async (image: GalleryImage) => {
    setIsDeleting(true);
    try {
      await deleteGalleryImage(image);
      toast({
        title: "Photo Deleted",
        description: "The image has been removed from the gallery.",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: "There was a problem deleting the image. It may have already been removed.",
      });
    } finally {
        setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Gallery Management</h1>
          <p className="text-muted-foreground">Manage and upload photos to the gallery.</p>
        </div>
        <UploadDialog onUploadComplete={() => router.refresh()} />
      </div>
      {initialImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {initialImages.map((image) => (
            <Card key={image.id} className="group relative overflow-hidden">
              <Image
                src={image.url}
                alt={image.description || "Gallery image"}
                width={400}
                height={300}
                className="object-cover w-full h-full aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors">
                <div className="absolute bottom-0 left-0 p-3 w-full">
                  {image.description && <p className="text-white text-sm truncate">{image.description}</p>}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete Photo</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the photo from your storage and remove its entry from the gallery.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(image)} disabled={isDeleting}>
                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))}
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center min-h-[400px]">
            <ImagePlus className="h-12 w-12 text-muted-foreground" />
             <h3 className="mt-4 text-lg font-semibold">The gallery is empty</h3>
             <p className="mt-2 text-sm text-muted-foreground">
               Click "Add Photo" to upload your first image.
             </p>
           </div>
      )}
    </div>
  );
}
