
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  Users,
  Home,
  Image as ImageIcon,
  FileText,
  LogOut,
  Sparkles,
  GraduationCap,
  Menu,
  HomeIcon,
  Settings,
  LifeBuoy,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


const navItems = [
  { href: '/admin/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/admin/children', icon: Users, label: 'Children' },
  { href: '/admin/parents', icon: Users, label: 'Parents' },
  { href: '/admin/teachers', icon: GraduationCap, label: 'Teachers' },
  { href: '/admin/communications', icon: MessageSquare, label: 'Communications' },
  { href: '/admin/events', icon: Bell, label: 'Events' },
  { href: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
  { href: '/admin/documents', icon: FileText, label: 'Documents' },
  { href: '/admin/ai-assistant', icon: Sparkles, label: 'AI Assistant' },
];

function AdminSidebar() {
    const pathname = usePathname();
    return (
        <div className="hidden border-r bg-sidebar md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-16 items-center border-b px-4 lg:px-6">
                     <Link href="/" className="flex items-center gap-2">
                        <Logo className="w-14 h-14" />
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {navItems.map(item => (
                             <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent",
                                    pathname === item.href && "bg-sidebar-accent"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}


function AdminHeader() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/login');
    } catch (error) {
       console.error("Logout failed:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out.",
      });
    }
  };


  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                     <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                        <Logo className="w-14 h-14" />
                     </Link>
                      {navItems.map(item => (
                             <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                                    pathname === item.href && "bg-muted text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                </nav>
            </SheetContent>
        </Sheet>
        
        {/* Desktop Header */}
        <div className="w-full flex-1">
             <Button variant="outline" size="sm" asChild>
                <Link href="/"><HomeIcon/> Home</Link>
             </Button>
        </div>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/40?u=admin" alt="Admin" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/admin/settings"><Settings className="mr-2 h-4 w-4" />Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/admin/support"><LifeBuoy className="mr-2 h-4 w-4" />Support</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div className="flex flex-col">
            <AdminHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </div>
    </div>
  );
}
