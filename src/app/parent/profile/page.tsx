import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  return (
    <div className="bg-background min-h-screen">
       <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex items-center">
            <Button variant="secondary" size="sm" asChild>
                <Link href="/parent/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8 flex justify-center">
        <Tabs defaultValue="child-info" className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="child-info">Child's Info</TabsTrigger>
            <TabsTrigger value="parent-info">My Info</TabsTrigger>
            <TabsTrigger value="contacts">Emergency</TabsTrigger>
          </TabsList>
          <TabsContent value="child-info">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Child's Information</CardTitle>
                <CardDescription>
                  Manage your child's profile details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Leo" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Bloom" />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="2021-08-15" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies & Medical Notes</Label>
                  <Textarea id="allergies" placeholder="e.g., Peanuts, lactose intolerant" defaultValue="None"/>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="parent-info">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Parent/Guardian Information</CardTitle>
                <CardDescription>
                  Update your contact information here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="parent-first-name">First Name</Label>
                        <Input id="parent-first-name" defaultValue="Anna" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="parent-last-name">Last Name</Label>
                        <Input id="parent-last-name" defaultValue="Bloom" />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="anna.bloom@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="123-456-7890" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contacts">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline">Emergency Contacts</CardTitle>
                <CardDescription>
                  Manage your emergency contacts. Please provide at least one.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-4 border p-4 rounded-lg">
                    <h3 className="font-semibold">Contact 1</h3>
                    <div className="space-y-2">
                        <Label htmlFor="contact1-name">Full Name</Label>
                        <Input id="contact1-name" defaultValue="John Bloom" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="contact1-relation">Relationship</Label>
                        <Input id="contact1-relation" defaultValue="Father" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="contact1-phone">Phone Number</Label>
                        <Input id="contact1-phone" type="tel" defaultValue="123-456-7891" />
                    </div>
                 </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
