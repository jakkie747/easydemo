import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreativeAssistantForm } from "./creative-assistant-form";
import { LessonPlanForm } from "./lesson-plan-form";
import { NewsletterForm } from "./newsletter-form";
import { StudentPraiseForm } from "./student-praise-form";
import { BookOpen, Newspaper, Sparkles, Star, ToyBrick } from "lucide-react";

export default function AiAssistantPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-headline text-3xl font-bold">AI Assistants</h1>
        <p className="text-muted-foreground">
          Your creative partner for the classroom. Select a tool to get started.
        </p>
      </div>

      <Tabs defaultValue="creative-assistant" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="creative-assistant" className="flex-col h-full py-2">
            <ToyBrick className="mb-1" />
            Creative Assistant
          </TabsTrigger>
          <TabsTrigger value="lesson-planner" className="flex-col h-full py-2">
            <BookOpen className="mb-1" />
            Lesson Planner
          </TabsTrigger>
          <TabsTrigger value="newsletter-helper" className="flex-col h-full py-2">
            <Newspaper className="mb-1" />
            Newsletter Helper
          </TabsTrigger>
          <TabsTrigger value="student-praise" className="flex-col h-full py-2">
            <Star className="mb-1" />
            Student Praise
          </TabsTrigger>
        </TabsList>

        <TabsContent value="creative-assistant">
            <CardWithTitle title="Creative Assistant" description="Generate story starters and activity ideas for your classroom.">
                <CreativeAssistantForm />
            </CardWithTitle>
        </TabsContent>

        <TabsContent value="lesson-planner">
             <CardWithTitle title="Lesson Plan Assistant" description="Quickly generate a structured lesson plan for any topic.">
                <LessonPlanForm />
            </CardWithTitle>
        </TabsContent>

        <TabsContent value="newsletter-helper">
             <CardWithTitle title="Newsletter Helper" description="Turn bullet points into a friendly newsletter snippet for parents.">
                <NewsletterForm />
            </CardWithTitle>
        </TabsContent>

         <TabsContent value="student-praise">
             <CardWithTitle title="Student Praise Generator" description="Create unique and encouraging praise for individual students.">
                <StudentPraiseForm />
            </CardWithTitle>
        </TabsContent>

      </Tabs>
    </div>
  );
}


function CardWithTitle({ title, description, children }: { title: string, description: string, children: React.ReactNode }) {
    return (
         <div className="border rounded-lg p-6 bg-card text-card-foreground">
            <h2 className="text-2xl font-bold font-headline">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            {children}
        </div>
    )
}
