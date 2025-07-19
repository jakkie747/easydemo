
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
              Simplify Your Childcare Management
            </h1>
            <p className="mt-4 text-lg text-foreground/80">
              Easyspark is the all-in-one platform to manage your preschool or daycare. Handle registrations, parent communication, and daily reports with ease.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link href="/register/preschool">Enroll Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Parent Login</Link>
              </Button>
            </div>
          </div>
          <div>
            <Image 
              src="/hero-image.png"
              alt="Children playing happily at a daycare" 
              width={600} 
              height={400}
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="programs" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-4xl font-bold text-primary">Our Programs</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">We offer programs designed to nurture and educate children at different stages of their early development.</p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 border rounded-lg bg-card shadow-md">
              <h3 className="font-headline text-2xl text-accent">Preschool Program</h3>
              <p className="text-muted-foreground mt-2 mb-4">A play-based curriculum focusing on social skills, creativity, and school readiness for children ages 2-5.</p>
              <Button asChild>
                  <Link href="/register/preschool">Learn More & Register</Link>
              </Button>
            </div>
            <div className="p-8 border rounded-lg bg-card shadow-md">
              <h3 className="font-headline text-2xl text-accent">Afterschool Program</h3>
              <p className="text-muted-foreground mt-2 mb-4">Homework help, STEM activities, and fun projects for school-aged children from Kindergarten to 5th grade.</p>
               <Button asChild>
                  <Link href="/register/afterschool">Learn More & Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
           <h2 className="font-headline text-4xl font-bold text-primary text-center">What Parents Are Saying</h2>
           <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-md">
                <blockquote className="italic text-muted-foreground">"Easyspark has been a lifesaver! The daily reports keep me connected to my daughter's day, and the staff is amazing."</blockquote>
                <p className="mt-4 font-semibold text-primary">- Sarah L.</p>
              </div>
               <div className="bg-card p-6 rounded-lg shadow-md">
                <blockquote className="italic text-muted-foreground">"The registration process was so smooth, and we love the photo gallery. It feels like we're part of our son's day even when we're at work."</blockquote>
                <p className="mt-4 font-semibold text-primary">- Mike J.</p>
              </div>
               <div className="bg-card p-6 rounded-lg shadow-md">
                <blockquote className="italic text-muted-foreground">"The AI tools for the teachers are brilliant. The creative ideas and lesson plans are top-notch. Highly recommend!"</blockquote>
                <p className="mt-4 font-semibold text-primary">- Emily C.</p>
              </div>
           </div>
        </div>
      </section>
    </>
  );
}
