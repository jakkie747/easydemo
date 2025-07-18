
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
import { MoreHorizontal, PlusCircle } from "lucide-react";

// Mock data - in a real app, this would come from a database
const children = [
  { id: 'c1', name: 'Leo Bloom', avatar: 'https://i.pravatar.cc/150?u=leo', classroom: 'Bumblebees', age: 4, parent: 'Anna Bloom' },
  { id: 'c2', name: 'Olivia Martin', avatar: 'https://i.pravatar.cc/150?u=olivia', classroom: 'Sunflowers', age: 3, parent: 'Sarah Martin' },
  { id: 'c3', name: 'Liam Neeson', avatar: 'https://i.pravatar.cc/150?u=liam', classroom: 'Star Gazers', age: 6, parent: 'Michael Neeson' },
  { id: 'c4', name: 'Emma Watson', avatar: 'https://i.pravatar.cc/150?u=emma', classroom: 'Bumblebees', age: 4, parent: 'Jessica Watson' },
  { id: 'c5', name: 'Noah Brown', avatar: 'https://i.pravatar.cc/150?u=noah', classroom: 'Little Sprouts', age: 3, parent: 'Chris Brown' },
];

export default function ChildrenPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Child Management</h1>
          <p className="text-muted-foreground">
            View, add, edit, or remove children from your center.
          </p>
        </div>
        <Button>
          <PlusCircle /> Add Child
        </Button>
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
              {children.map((child) => (
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
                        <DropdownMenuItem>View Daily Report</DropdownMenuItem>
                        <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Remove Child
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
