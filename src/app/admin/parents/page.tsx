
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, PlusCircle } from "lucide-react";

// Mock data
const parents = [
    { id: 'p1', name: 'Anna Bloom', avatar: 'https://i.pravatar.cc/150?u=anna', email: 'anna.bloom@example.com', children: ['Leo Bloom'] },
    { id: 'p2', name: 'Sarah Martin', avatar: 'https://i.pravatar.cc/150?u=sarah', email: 'sarah.martin@example.com', children: ['Olivia Martin'] },
    { id: 'p3', name: 'Michael Neeson', avatar: 'https://i.pravatar.cc/150?u=michael', email: 'michael.neeson@example.com', children: ['Liam Neeson'] },
    { id: 'p4', name: 'Jessica Watson', avatar: 'https://i.pravatar.cc/150?u=jessica', email: 'jessica.watson@example.com', children: ['Emma Watson'] },
];

export default function ParentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Parent Management</h1>
          <p className="text-muted-foreground">
            View and manage parent accounts.
          </p>
        </div>
        <Button>
          <PlusCircle /> Add Parent
        </Button>
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
              {parents.map((parent) => (
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
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Delete Account
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
