
"use client";

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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlusCircle, Database } from "lucide-react";
import type { Teacher } from "@/lib/types";
import { seedDatabase } from "@/lib/seed";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function TeachersClient({ teachers }: { teachers: Teacher[] }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleSeed = async () => {
    const result = await seedDatabase();
    if (result.success) {
      toast({
        title: "Database Seeded!",
        description: `${result.count} teachers were added to Firestore.`,
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
            <Button>
              <PlusCircle /> Add Teacher
            </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Teachers</CardTitle>
          <CardDescription>
            {teachers.length > 0
              ? "A list of all the teachers in your center."
              : "No teachers found. Try seeding the database."
            }
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
                          <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
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
