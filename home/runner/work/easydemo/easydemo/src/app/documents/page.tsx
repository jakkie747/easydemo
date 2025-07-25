
"use client";

import * as React from "react";
import { getDocuments } from "@/lib/firestore";
import type { Document } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function DocumentsSkeleton() {
    return (
        <div className="border rounded-lg p-4">
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    )
}

export default function DocumentsPage() {
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDocuments = async () => {
        setIsLoading(true);
        const docs = await getDocuments();
        setDocuments(docs);
        setIsLoading(false);
    };
    fetchDocuments();
  }, []);

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Important Documents</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Download newsletters, forms, and other important files.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
            {isLoading ? <DocumentsSkeleton/> : documents.length > 0 ? (
                 <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Type</TableHead>
                            <TableHead className="hidden md:table-cell">Date Uploaded</TableHead>
                            <TableHead className="text-right">Download</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {documents.map((doc) => (
                            <TableRow key={doc.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <span className="font-medium">{doc.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">{doc.type}</TableCell>
                                <TableCell className="hidden md:table-cell">{doc.uploaded}</TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={doc.url} target="_blank" download>
                                            <Download className="mr-2 h-4 w-4" />
                                            Download
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                 <div className="text-center text-muted-foreground py-16 border border-dashed rounded-lg">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold">No Documents Available</h3>
                    <p className="mt-2 text-sm">Please check back later for important files.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
