
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, PlusCircle, Database, Loader2 } from "lucide-react";
import type { Teacher } from "@/lib/types";
import { useUpload } from "@/hooks/use-upload";
import { useToast } from "@/hooks/use-toast";
import { addTeacher, updateTeacher } from "@/lib/firestore";
import { deleteTeacher } from "@/lib/firebase-server";
import { seedDatabase } from "@/lib/seed";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  classroom: z.string().min(1, { message: "Classroom is required." }),
  status: z.enum(['Active', 'On Leave']),
  avatar: z.any().optional(),
});

function TeacherFormDialog({
  teacher,
  onComplete,
  mode,
}: {
  teacher?: Teacher;
  onComplete: () => void;
  mode: "add" | "edit";
}) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { upload, progress, isLoading: isUploading } = useUpload();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit" && teacher
        ? {
            name: teacher.name,
            email: teacher.email,
            classroom: teacher.classroom,
            status: teacher.status,
          }
        : {
            name: "",
            email: "",
            classroom: "",
            status: "Active",
          },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let avatarUrl = teacher?.avatar;

    try {
      if (file) {
        const storagePath = `avatars/teachers/${Date.now()}_${file.name}`;
        const uploadedURL = await upload(file, storagePath);
        if (uploadedURL) {
          avatarUrl = uploadedURL;
        } else {
          toast({ variant: "destructive", title: "Avatar Upload Failed" });
          return;
        }
      }

      const teacherData = { ...values, avatar: avatarUrl || `https://i.pravatar.cc/150?u=${values.email}`};

      if (mode === "edit" && teacher) {
        await updateTeacher(teacher.id, teacherData);
        toast({ title: "Teacher Updated!", description: `${values.name}'s profile has been updated.` });
      } else {
        await addTeacher(teacherData);
        toast({ title: "Teacher Added!", description: `${values.name} has been added.` });
      }
      form.reset();
      setFile(null);
      setIsOpen(false);
      onComplete();
    } catch (error) {
      toast({ variant: "destructive", title: "Action Failed", description: "Could not save the teacher's profile." });
    }
  };

  const triggerButton =
    mode === "add" ? (
      <Button><PlusCircle /> Add Teacher</Button>
    ) : (
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit Profile</DropdownMenuItem>
    );

  const isSubmitting = form.formState.isSubmitting || isUploading;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? `Edit ${teacher?.name}'s Profile` : "Add a New Teacher"}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? "Update the details for this teacher." : "Fill in the details for the new teacher."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="e.g., jane.doe@example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="classroom" render={({ field }) => (
                <FormItem><FormLabel>Classroom</FormLabel><FormControl><Input placeholder="e.g., Bumblebees" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage /></FormItem>
            )} />
            <div className="space-y-2">
              <Label htmlFor="file">Avatar</Label>
              <Input id="file" type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            {isUploading && <Progress value={progress} />}
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


export function TeachersClient({ teachers }: { teachers: Teacher[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleSeed = async () => {
    const result = await seedDatabase();
    if (result.success) {
      toast({
        title: "Database Seeded!",
        description: `${result.count} documents were added. The page will now refresh.`,
      });
      router.refresh();
    } else {
       toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: result.message,
      });
    }
  };

  const handleDelete = async (teacherId: string) => {
    setIsDeleting(true);
    try {
        await deleteTeacher(teacherId);
        toast({ title: "Teacher Deleted", description: "The teacher has been removed." });
        router.refresh();
    } catch (error) {
        toast({ variant: "destructive", title: "Deletion Failed" });
    } finally {
        setIsDeleting(false);
    }
  };


  return (
    <div className="flex flex-col gap-4">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold">Teacher Management</h1>
            <p className="text-muted-foreground">View, add, edit, or remove teachers from your center.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={handleSeed}>
              <Database className="mr-2 h-4 w-4" /> Seed Database
            </Button>
            <TeacherFormDialog mode="add" onComplete={() => router.refresh()} />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Teachers</CardTitle>
          <CardDescription>
            A list of all the teachers in your center.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Classroom</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={teacher.avatar} alt={teacher.name} />
                          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{teacher.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.classroom}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                        {teacher.status}
                      </Badge>
                    </TableCell>
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
                          <TeacherFormDialog mode="edit" teacher={teacher} onComplete={() => router.refresh()} />
                           <AlertDialog>
                              <AlertDialogTrigger asChild>
                                  <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onSelect={(e) => e.preventDefault()}>
                                      Delete
                                  </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                  <AlertDialogHeader>
                                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                      <AlertDialogDescription>This will permanently delete {teacher.name}'s profile.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(teacher.id)} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                                          {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      No teachers found. Try seeding the database to get started.
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
