
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rocket, Sparkles, Sun, Palette, BookOpen, User, Quote, Users, GraduationCap, HeartHandshake } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                  Nurturing Bright Futures, One Spark at a Time
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover a place where curiosity is sparked, creativity is celebrated, and every child's potential is nurtured. Join our preschool and afterschool family today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register/preschool">
                    Enroll in Preschool
                    <Rocket/>
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register/afterschool">
                    Join Afterschool Fun
                    <Sparkles/>
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width="600"
              height="400"
              alt="Hero"
              data-ai-hint="happy children playing"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-lg"
            />
          </div>
        </div>
      </section>
      
      <section id="about" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Our Philosophy</div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Why Choose Easyspark?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We believe in a holistic approach to early childhood education, focusing on nurturing the whole child.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Expert Educators</h3>
              <p className="text-muted-foreground">
                Our team of passionate and certified teachers is dedicated to creating a supportive learning atmosphere.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <HeartHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Safe & Nurturing</h3>
              <p className="text-muted-foreground">
                We provide a secure and welcoming environment where children feel safe to explore, learn, and grow.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-headline">Community Focused</h3>
              <p className="text-muted-foreground">
                We foster a strong sense of community between parents, teachers, and children.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Our Programs</div>
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">A World of Discovery Awaits</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our programs are designed to provide a safe, engaging, and enriching environment that fosters growth, learning, and fun.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-2 mt-12">
            <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                  <Sun className="text-accent" />
                  Preschool Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Our preschool program focuses on play-based learning, social-emotional development, and kindergarten readiness. We create a nurturing space for your little ones to shine.</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 pt-2">
                  <li>Early literacy and numeracy skills</li>
                  <li>Creative arts and music exploration</li>
                  <li>Outdoor play and nature discovery</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                  <Palette className="text-accent" />
                  Afterschool Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">A stimulating and fun environment for school-aged children. We offer homework help, creative projects, and a variety of clubs to explore new interests.</p>
                 <ul className="list-disc list-inside text-muted-foreground space-y-1 pt-2">
                  <li>Homework assistance and tutoring</li>
                  <li>STEM, Arts, and Sports clubs</li>
                  <li>Building friendships in a safe setting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
               <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Words from Our Happy Parents</h2>
               <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We are proud of the community we've built. See what parents have to say about their experience at Easyspark.
               </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
            {[
              { name: 'Sarah L.', quote: "Easyspark has been a second home for our daughter. The teachers are so caring and the activities are always so creative!" },
              { name: 'Michael B.', quote: "The afterschool program is fantastic. My son gets his homework done and has a blast with his friends. It's a lifesaver!" },
              { name: 'Jessica P.', quote: "I'm so impressed with the communication. The daily reports on the parent dashboard keep me connected to my child's day." },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="bg-secondary/50 border-0">
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
