import Link from "next/link"
import { Logo } from "@/components/icons"
import { Github, Twitter, Dribbble } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-accent" />
            <span className="font-headline text-2xl">Easyspark</span>
          </div>
          <nav className="flex gap-4 md:gap-6">
            <Link href="#" className="text-sm hover:text-accent transition-colors">About</Link>
            <Link href="#programs" className="text-sm hover:text-accent transition-colors">Programs</Link>
            <Link href="/login" className="text-sm hover:text-accent transition-colors">Parent Login</Link>
            <Link href="/admin/dashboard" className="text-sm hover:text-accent transition-colors">Admin</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter"><Twitter className="w-5 h-5 hover:text-accent transition-colors" /></Link>
            <Link href="#" aria-label="GitHub"><Github className="w-5 h-5 hover:text-accent transition-colors" /></Link>
            <Link href="#" aria-label="Dribbble"><Dribbble className="w-5 h-5 hover:text-accent transition-colors" /></Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Easyspark Demo. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
