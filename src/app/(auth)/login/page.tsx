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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logo } from "@/components/icons"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
       <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
          <Logo className="h-6 w-6" />
          <span className="font-headline text-xl">Easyspark</span>
        </Link>
      </div>
      <Tabs defaultValue="parent" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parent">Parent</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="parent">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Parent Login</CardTitle>
              <CardDescription>
                Access your dashboard to view daily reports and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parent-email">Email</Label>
                <Input id="parent-email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-password">Password</Label>
                <Input id="parent-password" type="password" required />
              </div>
              <Button type="submit" className="w-full as-child">
                <Link href="/parent/dashboard">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Access the admin dashboard to manage the center.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input id="admin-email" type="email" placeholder="admin@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input id="admin-password" type="password" required />
              </div>
              <Button type="submit" className="w-full as-child">
                <Link href="/admin/dashboard">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
