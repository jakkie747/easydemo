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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Logo } from "@/components/icons"
import { ArrowLeft } from "lucide-react"

export default function PreschoolRegistrationPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
             <div className="flex items-center gap-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="font-headline text-2xl">Easyspark</span>
             </div>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Preschool Registration</CardTitle>
            <CardDescription>Complete the steps below to enroll your child in our preschool program.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="child-info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="child-info">1. Child's Info</TabsTrigger>
                <TabsTrigger value="parent-info">2. Parent's Info</TabsTrigger>
                <TabsTrigger value="emergency">3. Emergency</TabsTrigger>
              </TabsList>
              
              <TabsContent value="child-info" className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="child-first-name">First Name</Label>
                      <Input id="child-first-name" placeholder="Leo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="child-last-name">Last Name</Label>
                      <Input id="child-last-name" placeholder="Bloom" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="child-dob">Date of Birth</Label>
                    <Input id="child-dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies & Medical Notes</Label>
                    <Textarea id="allergies" placeholder="List any allergies or important medical information." />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="parent-info" className="pt-6">
                <div className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parent-first-name">First Name</Label>
                      <Input id="parent-first-name" placeholder="Anna" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-last-name">Last Name</Label>
                      <Input id="parent-last-name" placeholder="Bloom" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="anna.bloom@example.com" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="123-456-7890" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="emergency" className="pt-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-name">Emergency Contact Full Name</Label>
                      <Input id="emergency-name" placeholder="John Bloom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-relation">Relationship to Child</Label>
                      <Input id="emergency-relation" placeholder="Father" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
                      <Input id="emergency-phone" type="tel" placeholder="123-456-7891" />
                    </div>
                  </div>
              </TabsContent>

            </Tabs>
             <div className="mt-8 flex justify-end">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Submit Registration</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
