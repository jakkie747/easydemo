
"use client"
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Users,
  Bell,
  Image as ImageIcon,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react"

const navItems = [
  { href: '/admin/children', icon: Users, label: 'Children', description: 'Manage student profiles.' },
  { href: '/admin/parents', icon: Users, label: 'Parents', description: 'Manage parent accounts.' },
  { href: '/admin/teachers', icon: GraduationCap, label: 'Teachers', description: 'Manage teacher profiles.' },
  { href: '/admin/events', icon: Bell, label: 'Events', description: 'Create and manage events.' },
  { href: '/admin/gallery', icon: ImageIcon, label: 'Gallery', description: 'Manage the photo gallery.' },
  { href: '/admin/documents', icon: FileText, label: 'Documents', description: 'Upload and manage files.' },
  { href: '/admin/ai-assistant', icon: Sparkles, label: 'AI Assistant', description: 'Generate creative ideas.' },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, your management panel is ready.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Navigate to different sections of the admin panel. These features are currently under development and will be enabled soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {navItems.map((item) => (
              <Link href={item.href} key={item.label} passHref>
                <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors h-full flex flex-col">
                  <item.icon className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-semibold">{item.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
