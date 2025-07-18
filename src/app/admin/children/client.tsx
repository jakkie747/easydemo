
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, PlusCircle, Loader2 } from "lucide-react";

import type { Child } from "@/lib/types";
import { useUpload } from "@/hooks/use-upload";
import { useToast } from "@/hooks/use-toast";
import { addChild, updateChild } from "@/lib/firestore";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  classroom: z.string().min(1, { message: "Classroom is required." }),
  age: z.coerce.number().min(1, { message: "Age must be at least 1." }),
  parent: z.string().min(2, { message: "Parent's name is required." }),
  avatar: z.any().optional(),
});

function EditChildDialog({ child, onChildUpdated }: { child: Child; onChildUpdated: () => void }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { upload, progress, isLoading: isUploading } = useUpload();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: child.name,
      classroom: child.classroom,
      age: child.age,
      parent: child.parent,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let avatarUrl = child.avatar;

    if (file) {
      const storagePath = `avatars/${Date.now()}_${file.name}`;
      const uploadedURL = await upload(file, storagePath);
      if (uploadedURL) {
        avatarUrl = uploadedURL;
      } else {
        toast({ variant: "destructive", title: "Avatar Upload Failed", description: "Could not upload the new avatar. Please try again." });
        return;
      }
    }

    try {
      await updateChild(child.id, {
        ...values,
        avatar: avatarUrl,
      });

      toast({ title: "Child Updated!", description: `${values.name}'s profile has been updated.` });
      form.reset(values);
      setFile(null);
      setIsOpen(false);
      onChildUpdated();
    } catch (error) {
      toast({ variant: "destructive", title: "Update Failed", description: "Could not update the child's profile. Please try again." });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit Profile</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {child.name}'s Profile</DialogTitle>
          <DialogDescription>
            Update the details for this child below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="classroom" render={({ field }) => (
              <FormItem>
                <FormLabel>Classroom</FormLabel>
                <FormControl><Input placeholder="e.g., Bumblebees" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="age" render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="parent" render={({ field }) => (
              <FormItem>
                <FormLabel>Parent's Name</FormLabel>
                <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="space-y-2">
              <Label htmlFor="file">Change Avatar</Label>
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
              <Button type="submit" disabled={isUploading}>
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


function AddChildDialog({ onChildAdded }: { onChildAdded: () => void }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { upload, progress, isLoading: isUploading } = useUpload();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", classroom: "", age: 0, parent: "" },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let avatarUrl = "https://placehold.co/150x150.png";

    if (file) {
      const storagePath = `avatars/${Date.now()}_${file.name}`;
      const uploadedURL = await upload(file, storagePath);
      if (uploadedURL) {
        avatarUrl = uploadedURL;
      } else {
        toast({ variant: "destructive", title: "Avatar Upload Failed", description: "Could not upload the avatar. Please try again." });
        return;
      }
    }

    try {
      await addChild({
        ...values,
        avatar: avatarUrl,
      });

      toast({ title: "Child Added!", description: `${values.name} has been added.` });
      form.reset();
      setFile(null);
      setIsOpen(false);
      onChildAdded();
    } catch (error) {
      toast({ variant: "destructive", title: "Submission Failed", description: "Could not add the child. Please try again." });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle /> Add Child
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Child</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new child to the center.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="classroom" render={({ field }) => (
              <FormItem>
                <FormLabel>Classroom</FormLabel>
                <FormControl><Input placeholder="e.g., Bumblebees" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="age" render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
             <FormField control={form.control} name="parent" render={({ field }) => (
              <FormItem>
                <FormLabel>Parent's Name</FormLabel>
                <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
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
              <Button type="submit" disabled={isUploading}>
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Child
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export function ChildrenClient({ initialChildren }: { initialChildren: Child[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Child Management</h1>
          <p className="text-muted-foreground">
            View, add, edit, or remove children from your center.
          </p>
        </div>
        <AddChildDialog onChildAdded={() => router.refresh()} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Children</CardTitle>
          <CardDescription>
            A list of all the children enrolled in your center.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Classroom</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialChildren.length > 0 ? (
                initialChildren.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={child.avatar} alt={child.name} />
                          <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{child.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{child.classroom}</Badge>
                    </TableCell>
                    <TableCell>{child.age}</TableCell>
                    <TableCell>{child.parent}</TableCell>
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
                          <DropdownMenuItem onClick={() => router.push(`/admin/children/${child.id}/report`)}>
                            View Daily Report
                          </DropdownMenuItem>
                          <EditChildDialog child={child} onChildUpdated={() => router.refresh()} />
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            Remove Child
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No children found. Try seeding the database or adding a child.
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
