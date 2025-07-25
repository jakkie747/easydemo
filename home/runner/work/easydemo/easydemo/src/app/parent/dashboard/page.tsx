
'use client'
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FilePen, LogOut, Loader2, Baby } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth-provider"
import { useEffect, useState } from "react"
import type { Parent } from "@/lib/types"
import { getParent } from "@/lib/firestore"
import { Skeleton } from "@/components/ui/skeleton"

function ParentDashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-md">
            <CardHeader className="items-center text-center">
              <Skeleton className="w-24 h-24 rounded-full mb-4" />
              <Skeleton className="h-8 w-40" />
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
           <Card className="shadow-md">
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                 <p>Loading your dashboard...</p>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

export default function ParentDashboard() {
  const router = useRouter();
  const { user, loading: authLoading, signOutUser } = useAuth();
  const [parentData, setParentData] = useState<Parent | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
      if (user) {
          const fetchData = async () => {
              setDataLoading(true);
              const parent = await getParent(user.uid);
              setParentData(parent);
              setDataLoading(false);
          };
          fetchData();
      } else if (!authLoading) {
          router.push('/login');
      }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    await signOutUser();
    router.push('/login');
  };

  if (authLoading || dataLoading) {
    return <ParentDashboardSkeleton />;
  }

  if (!parentData) {
      return (
           <div className="container mx-auto px-4 md:px-8 py-8">
                <Card className="max-w-xl mx-auto">
                    <CardHeader>
                        <CardTitle>Welcome!</CardTitle>
                        <CardDescription>We couldn't load your information. This might be because your account setup is not yet complete.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Please contact the school administration to ensure your parent account is linked to your child's profile.</p>
                         <Button className="w-full mt-4" variant="outline" onClick={handleLogout}>
                            <LogOut /> Log Out
                        </Button>
                    </CardContent>
                </Card>
           </div>
      )
  }

  return (
    <div className="bg-muted/40 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="sticky top-24 shadow-md">
              <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                  <AvatarImage src={parentData.avatar} alt={parentData.name} />
                  <AvatarFallback>{parentData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-3xl">{parentData.name}</CardTitle>
                <CardDescription>Parent</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                 <Button className="w-full" asChild>
                    <Link href="/parent/profile">
                        <FilePen /> Edit Profile
                    </Link>
                </Button>
                 <Button className="w-full" variant="outline" onClick={handleLogout}>
                    <LogOut /> Log Out
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Welcome to Your Dashboard</CardTitle>
                 <CardDescription>This is your space to manage your child's information and stay updated.</CardDescription>
              </CardHeader>
              <CardContent>
                {parentData.childDetails && parentData.childDetails.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center"><Baby className="mr-2"/> Your Children</h3>
                    {parentData.childDetails.map(child => (
                      <div key={child.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                        <div className="flex items-center gap-4">
                           <Avatar>
                            <AvatarImage src={child.avatar} alt={child.name} />
                            <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="font-semibold">{child.name}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Daily reports coming soon!</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Your account is not yet linked to a child's profile. Please contact the school for assistance.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
