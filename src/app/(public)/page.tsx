
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rocket, Sparkles, Sun, Palette, BookOpen, User, Quote, Users, ShieldCheck, Cpu } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                  The All-in-One Digital Hub for Modern Preschools
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  Empower teachers, engage parents, and simplify administration. Easyspark is the digital solution designed to bridge the gap between home and school.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register/preschool">
                    Register your child
                    <Rocket/>
                  </Link>
                </Button>
                 <Button size="lg" variant="secondary" asChild>
                  <Link href="/register/afterschool">
                    Register for Afterschool
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="/hero.png"
              width="600"
              height="400"
              alt="Hero"
              data-ai-hint="happy children using tablets with teacher"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-lg"
            />
          </div>
        </div>
      </section>
      
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-secondary-foreground">Why Easyspark?</div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">A Single Platform for Your Entire School Community</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We provide secure, easy-to-use tools designed to streamline your daily tasks, enhance parent communication, and let your school shine.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Cpu className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Empower Teachers</h3>
              <p className="text-muted-foreground">
                Our AI Assistant and communication tools let teachers focus on what they do best—teaching!
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Engage Parents</h3>
              <p className="text-muted-foreground">
                Give parents the peace of mind they crave with daily digital reports and seamless communication in a secure portal.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Simplify Administration</h3>
              <p className="text-muted-foreground">
                Manage student profiles, enrollment, and school content from a single, centralized dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Our Features</div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Tools to Supercharge Your School</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From AI-powered creativity to effortless administration, Easyspark is packed with features for everyone.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-2 mt-12">
            <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 bg-secondary/50 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                  <Sparkles className="text-accent" />
                  For Teachers & Admins
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Focus on what matters most. Our platform provides the tools to make your job easier and more creative.</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 pt-2">
                  <li><strong>AI Creative Assistant:</strong> Instantly generate story starters & activity ideas.</li>
                  <li><strong>Effortless Child Management:</strong> Manage profiles from a central dashboard.</li>
                  <li><strong>Simplified Content Management:</strong> Easily update events, gallery, and documents.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 bg-secondary/50 border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                  <User className="text-accent" />
                  For Parents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Stay connected to your child's day with a secure, private portal dedicated to their progress and your peace of mind.</p>
                 <ul className="list-disc list-inside text-muted-foreground space-y-1 pt-2">
                  <li><strong>Daily Digital Reports:</strong> Get updates on mood, meals, naps, and activities.</li>
                  <li><strong>Secure Parent Portal:</strong> Access everything in one place, from any device.</li>
                  <li><strong>Stay Informed:</strong> Browse the latest photos, events, and important documents.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
               <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Words from Our Community</h2>
               <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are proud to bridge the gap between home and school. See what our users have to say about their experience.
               </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
            {[
              { name: 'Director Sarah L.', quote: "Easyspark has revolutionized our admin tasks. The child management dashboard saves us hours every week!" },
              { name: 'Teacher Michael B.', quote: "The AI assistant is a game-changer for lesson planning. I can generate creative ideas in seconds. My kids love the new stories!" },
              { name: 'Parent Jessica P.', quote: "I'm so impressed with the communication. The daily reports on the parent dashboard keep me connected to my child's day." },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="bg-background/50 border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Quote className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/40?u=${testimonial.name}`} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
