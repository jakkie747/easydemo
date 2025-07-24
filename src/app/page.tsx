
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <div className="w-full">
        <Image
          src="https://placehold.co/1200x400.png"
          data-ai-hint="parent teacher meeting"
          alt="Parents and teachers in a meeting"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
      <main className="container mx-auto px-4 py-8">
        <section id="programs" className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Programs</h2>
          <p className="mb-6 text-gray-700">
            We offer programs designed to nurture and educate children at different stages of their early development.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold">Preschool Program</h3>
              <p className="mt-1 text-gray-600">
                A play-based curriculum focusing on social skills, creativity, and school readiness for children ages 2-5.
              </p>
              <Link href="/register/preschool" className="text-blue-600 hover:underline">
                Learn More & Register
              </Link>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Afterschool Program</h3>
              <p className="mt-1 text-gray-600">
                Homework help, STEM activities, and fun projects for school-aged children from Kindergarten to 5th grade.
              </p>
              <Link href="/register/afterschool" className="text-blue-600 hover:underline">
                Learn More & Register
              </Link>
            </div>
          </div>
        </section>

        <section id="events">
          <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
          <p className="mb-6 text-gray-700">
            Stay up to date with our latest activities and gatherings.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="text-xl font-semibold">Kids Golf Day</h4>
              <div className="flex items-center text-gray-600 mt-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Saturday, November 15</span>
              </div>
              <p className="mt-1 text-gray-600">Golfing day for the kids</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
