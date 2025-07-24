
"use client";
import Link from "next/link"
import { Logo } from "@/components/icons"
import { Github, Twitter, Dribbble } from "lucide-react"
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/parent') || pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  return (
    <footer className="w-full bg-secondary text-secondary-foreground">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-14 h-14" />
          </Link>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link>
            <Link href="/events" className="text-sm hover:text-primary transition-colors">Events</Link>
            <Link href="/gallery" className="text-sm hover:text-primary transition-colors">Gallery</Link>
            <Link href="/login" className="text-sm hover:text-primary transition-colors">Parent Login</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-primary transition-colors" /></Link>
            <Link href="#" aria-label="GitHub"><Github className="w-5 h-5 hover:text-primary transition-colors" /></Link>
            <Link href="#" aria-label="Dribbble"><Dribbble className="w-5 h-5 hover:text-primary transition-colors" /></Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Easyspark Demo. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
