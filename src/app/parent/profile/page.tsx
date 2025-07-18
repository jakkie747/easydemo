
"use client"
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
import { ArrowLeft, User, Shield, KeyRound } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  return (
    <div className="bg-muted/40 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
              <Link href="/parent/dashboard">
                  <ArrowLeft />
                  Back to Dashboard
              </Link>
          </Button>
        </div>
        <main className="flex justify-center">
          <Tabs defaultValue="child-info" className="w-full max-w-3xl">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="child-info">Child's Info</TabsTrigger>
              <TabsTrigger value="parent-info">My Info</TabsTrigger>
              <TabsTrigger value="contacts">Emergency</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            {/* Child Info Tab */}
            <TabsContent value="child-info">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><User/>Child's Information</CardTitle>
                  <CardDescription>
                    Manage your child's profile details. This information helps us provide the best care.
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
                  <div className="flex justify-end">
                      <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Parent Info Tab */}
            <TabsContent value="parent-info">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><User/>Parent/Guardian Information</CardTitle>
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
                    <Input id="email" type="email" defaultValue="anna.bloom@example.com" disabled />
                    <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="123-456-7890" />
                  </div>
                  <div className="flex justify-end">
                      <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Emergency Contacts Tab */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><Shield/>Emergency Contacts</CardTitle>
                  <CardDescription>
                    Manage your emergency contacts. Please provide at least one.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 border p-4 rounded-lg relative">
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
                  <div className="flex justify-end">
                      <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><KeyRound/>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <div className="flex justify-end">
                      <Button>Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  )
}
