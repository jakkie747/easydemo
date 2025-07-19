
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from "@/lib/firebase";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react";

import type { Parent } from "@/lib/types";
import { useUpload } from "@/hooks/use-upload";
import { useToast } from "@/hooks/use-toast";
import { addParent } from "@/lib/firestore";
import { deleteParent } from "@/lib/firebase-server";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  avatar: z.any().optional(),
});

function AddParentDialog({ onParentAdded }: { onParentAdded: () => void }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { upload, progress, isLoading: isUploading } = useUpload();
  const { toast } = useToast();
  const auth = getAuth(app);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let avatarUrl = "https://placehold.co/150x150.png";

    try {
      // First, create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Second, if there's a file, upload it
      if (file) {
        const storagePath = `avatars/${Date.now()}_${file.name}`;
        const uploadedURL = await upload(file, storagePath);
        if (uploadedURL) {
          avatarUrl = uploadedURL;
        } else {
          toast({ variant: "destructive", title: "Avatar Upload Failed", description: "Could not upload the avatar, but parent account was created." });
        }
      }

      // Third, save the parent's data to Firestore
      await addParent({
        id: user.uid, // Use the UID from Auth as the document ID
        name: values.name,
        email: values.email,
        avatar: avatarUrl,
        children: [] // Initially no children linked
      });

      toast({ title: "Parent Added!", description: `${values.name}'s account has been created.` });
      form.reset();
      setFile(null);
      setIsOpen(false);
      onParentAdded();

    } catch (error: any) {
        let errorMessage = "Could not create the parent account. Please try again.";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This email address is already in use.";
        }
        console.error("Registration failed:", error)
        toast({ variant: "destructive", title: "Registration Failed", description: errorMessage });
    }
  };
  
  const isSubmitting = form.formState.isSubmitting || isUploading;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Add Parent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Parent</DialogTitle>
          <DialogDescription>
            Create a new parent account and profile. They can change their password later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl><Input type="email" placeholder="e.g., john.doe@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Temporary Password</FormLabel>
                <FormControl><Input type="password" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="space-y-2">
              <Label htmlFor="file">Avatar</Label>
              <Input id="file" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {isUploading && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Uploading... {Math.round(progress)}%</p>
                <Progress value={progress} />
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Parent
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export function ParentsClient({ initialParents }: { initialParents: Parent[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);
  const [isProcessing, setIsProcessing] = React.useState(false);


  const handleResetPassword = async (email: string) => {
    setIsProcessing(true);
    try {
        await sendPasswordResetEmail(auth, email);
        toast({
            title: "Password Reset Email Sent",
            description: `An email has been sent to ${email} with instructions to reset the password.`,
        });
    } catch (error) {
        console.error("Error sending password reset email:", error);
        toast({
            variant: "destructive",
            title: "Failed to Send Email",
            description: "There was a problem sending the password reset email.",
        });
    } finally {
        setIsProcessing(false);
    }
  }

  const handleDeleteParent = async (parent: Parent) => {
    setIsProcessing(true);
    try {
        await deleteParent(parent.id);
        toast({
            title: "Parent Account Deleted",
            description: `${parent.name}'s account and data have been removed.`,
        });
        router.refresh();
    } catch (error) {
         console.error("Error deleting parent:", error);
        toast({
            variant: "destructive",
            title: "Deletion Failed",
            description: "There was a problem deleting the parent account.",
        });
    } finally {
        setIsProcessing(false);
    }
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Parent Management</h1>
          <p className="text-muted-foreground">
            View and manage parent accounts.
          </p>
        </div>
        <AddParentDialog onParentAdded={() => router.refresh()} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Parents</CardTitle>
          <CardDescription>
            A list of all parents with children in your center.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Children</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialParents.length > 0 ? (
                initialParents.map((parent) => (
                  <TableRow key={parent.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={parent.avatar} alt={parent.name} />
                          <AvatarFallback>{parent.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{parent.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{parent.email}</TableCell>
                    <TableCell>{parent.children.join(', ')}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/admin/parents/${parent.id}`)}>
                            View Profile
                          </DropdownMenuItem>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    Reset Password
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Reset Password?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will send a password reset link to {parent.email}. Are you sure you want to proceed?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleResetPassword(parent.email)} disabled={isProcessing}>
                                        {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Email"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onSelect={(e) => e.preventDefault()}>
                                    Delete Account
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the parent account for {parent.name} and all associated data.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteParent(parent)} disabled={isProcessing} className="bg-destructive hover:bg-destructive/90">
                                       {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                 <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No parents found. Try seeding the database or adding one.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
