
import { getParent, getChildByName } from "@/lib/firestore";
import type { Parent, Child } from "@/lib/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, User, Mail, Users, Baby } from "lucide-react";

export default async function ParentProfilePage({ params }: { params: { id: string } }) {
  const parent: Parent | null = await getParent(params.id);

  if (!parent) {
    notFound();
  }

  // Fetch details for each child
  const childrenDetails: (Child | null)[] = await Promise.all(
    parent.children.map(childName => getChildByName(childName))
  );

  const validChildren = childrenDetails.filter(c => c !== null) as Child[];

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/parents">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Parents
          </Link>
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-md">
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                <AvatarImage src={parent.avatar} alt={parent.name} />
                <AvatarFallback>{parent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-3xl">{parent.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />{parent.email}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2"><Baby/>Enrolled Children</CardTitle>
              <CardDescription>
                Children associated with this parent account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {validChildren.length > 0 ? (
                <div className="space-y-4">
                  {validChildren.map(child => (
                    <div key={child.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={child.avatar} alt={child.name} />
                          <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{child.name}</p>
                          <p className="text-sm text-muted-foreground">{child.classroom}</p>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/children/${child.id}/report`}>View Report</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p>No children are currently linked to this parent.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
