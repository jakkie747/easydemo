
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Calendar, Users, Edit, Trash2, Loader2, PartyPopper } from "lucide-react";
import type { Event } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useUpload } from "@/hooks/use-upload";
import { addEvent, updateEvent } from "@/lib/firestore";
import { deleteEvent } from "@/lib/firebase-server";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  date: z.string().min(1, { message: "Date is required." }),
  time: z.string().min(1, { message: "Time is required." }),
  type: z.string().min(1, { message: "Event type is required." }),
  attendees: z.coerce.number().min(0, { message: "Attendees must be 0 or more." }),
  description: z.string().optional(),
});

function EventFormDialog({ event, onComplete, mode }: { event?: Event, onComplete: () => void, mode: 'add' | 'edit' }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const { upload, progress, isLoading: isUploading } = useUpload();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === 'edit' && event ? {
      title: event.title,
      date: event.date,
      time: event.time,
      type: event.type,
      attendees: event.attendees,
      description: event.description,
    } : {
      title: "",
      date: "",
      time: "",
      type: "",
      attendees: 0,
      description: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let imageUrl = event?.imageUrl;
    let imageStoragePath = event?.imageStoragePath;

    try {
        if (file) {
            const storagePath = `events/${Date.now()}_${file.name}`;
            const uploadedURL = await upload(file, storagePath);
            if (uploadedURL) {
                imageUrl = uploadedURL;
                imageStoragePath = storagePath;
            } else {
                toast({ variant: "destructive", title: "Image Upload Failed", description: "Could not upload the image. Please try again." });
                return;
            }
        }

        const eventData = { ...values, imageUrl, imageStoragePath };

        if (mode === 'edit' && event) {
            await updateEvent(event.id, eventData);
            toast({ title: "Event Updated!", description: `${values.title} has been updated.` });
        } else {
            await addEvent(eventData);
            toast({ title: "Event Created!", description: `${values.title} has been successfully created.` });
        }
        form.reset();
        setFile(null);
        setIsOpen(false);
        onComplete();
    } catch (error) {
        toast({ variant: "destructive", title: "Action Failed", description: "Could not save the event. Please try again." });
    }
  };

  const triggerButton = mode === 'add' ? (
    <Button>
      <PlusCircle /> Create Event
    </Button>
  ) : (
     <Button variant="ghost" size="icon">
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
    </Button>
  );

  const isSubmitting = form.formState.isSubmitting || isUploading;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? "Edit Event" : "Create New Event"}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? "Update the details for this event." : "Fill in the details for the new event."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="e.g., Spring Fling" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>Date</FormLabel><FormControl><Input placeholder="e.g., Saturday, May 25" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="time" render={({ field }) => (
                <FormItem><FormLabel>Time</FormLabel><FormControl><Input placeholder="e.g., 11:00 AM - 2:00 PM" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem><FormLabel>Type</FormLabel><FormControl><Input placeholder="e.g., Festival" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="attendees" render={({ field }) => (
                <FormItem><FormLabel>Expected Attendees</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe the event..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="space-y-2">
              <Label htmlFor="file">Event Image</Label>
              <Input id="file" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {isUploading && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Uploading... {Math.round(progress)}%</p>
                <Progress value={progress} />
              </div>
            )}
            <DialogFooter className="pt-4">
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function EventsClient({ initialEvents }: { initialEvents: Event[] }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async (eventId: string) => {
        setIsDeleting(true);
        try {
            await deleteEvent(eventId);
            toast({ title: "Event Deleted", description: "The event has been removed." });
            router.refresh();
        } catch (error) {
            toast({ variant: "destructive", title: "Deletion Failed", description: "Could not delete the event." });
        } finally {
            setIsDeleting(false);
        }
    }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Event Management</h1>
          <p className="text-muted-foreground">Create and manage center-wide events.</p>
        </div>
        <EventFormDialog mode="add" onComplete={() => router.refresh()} />
      </div>
      {initialEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initialEvents.map((event) => (
            <Card key={event.id} className="flex flex-col">
              {event.imageUrl && (
                 <div className="relative w-full h-48">
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                    />
                 </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    {event.type && <Badge variant="secondary" className="mb-2">{event.type}</Badge>}
                    <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <EventFormDialog mode="edit" event={event} onComplete={() => router.refresh()} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>This will permanently delete the event and its photo. This action cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(event.id)} disabled={isDeleting}>
                                 {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
      ) : (
        <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center min-h-[400px]">
            <PartyPopper className="h-12 w-12 text-muted-foreground" />
             <h3 className="mt-4 text-lg font-semibold">No events scheduled</h3>
             <p className="mt-2 text-sm text-muted-foreground">
               Click "Create Event" to add a new event to the calendar.
             </p>
           </div>
      )}
    </div>
  );
}
