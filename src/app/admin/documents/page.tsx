
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
import { MoreHorizontal, PlusCircle, Download, FileText } from "lucide-react";

// Mock data
const documents = [
    { id: 'doc1', name: 'Enrollment Agreement 2024.pdf', type: 'Application', uploaded: '2024-05-10', size: '2.3 MB' },
    { id: 'doc2', name: 'Health and Immunization Form.pdf', type: 'Medical', uploaded: '2024-05-12', size: '800 KB' },
    { id: 'doc3', name: 'Parent Handbook.pdf', type: 'Policy', uploaded: '2024-01-15', size: '1.5 MB' },
    { id: 'doc4', name: 'Emergency Contact List.xlsx', type: 'Roster', uploaded: '2024-08-01', size: '450 KB' },
];

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Document Management</h1>
          <p className="text-muted-foreground">
            Upload and manage important documents.
          </p>
        </div>
        <Button>
          <PlusCircle /> Upload Document
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>
            A list of all documents uploaded to the center.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <FileText className="text-muted-foreground" />
                        <span className="font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.uploaded}</TableCell>
                  <TableCell>{doc.size}</TableCell>
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
                        <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Delete
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
