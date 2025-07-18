
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateLessonPlan, type GenerateLessonPlanOutput } from "@/ai/flows/generate-lesson-plan";
import { Loader2, Sparkles, BookOpen, ClipboardList, Target, Wrench, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GenerateLessonPlanInputSchema = z.object({
  topic: z.string().describe('The main topic or theme for the lesson.'),
  gradeLevel: z.string().describe('The grade level of the students.'),
  duration: z.string().describe('The estimated duration of the lesson (e.g., 30 minutes, 1 hour).'),
});

export function LessonPlanForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<GenerateLessonPlanOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<import("zod").z.infer<typeof GenerateLessonPlanInputSchema>>({
    resolver: zodResolver(GenerateLessonPlanInputSchema),
    defaultValues: {
      topic: "The Four Seasons",
      gradeLevel: "preschool",
      duration: "45 minutes",
    },
  });

  async function onSubmit(values: import("zod").z.infer<typeof GenerateLessonPlanInputSchema>) {
    setIsLoading(true);
    setLessonPlan(null);
    try {
      const result = await generateLessonPlan(values);
      setLessonPlan(result);
    } catch (error) {
      console.error("Failed to generate lesson plan:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem generating the lesson plan.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1 h-fit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Under the Sea" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a grade level" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="preschool">Preschool</SelectItem>
                      <SelectItem value="kindergarten">Kindergarten</SelectItem>
                      <SelectItem value="1st grade">1st Grade</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 30 minutes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Lesson Plan
            </Button>
          </form>
        </Form>
      </div>
      <div className="md:col-span-1 lg:col-span-2">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center animate-pulse">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Building your lesson plan...</p>
          </div>
        )}
        {lessonPlan && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">{lessonPlan.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-2"><Target className="text-accent"/>Learning Objectives</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {lessonPlan.learningObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-2"><Wrench className="text-accent"/>Materials</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {lessonPlan.materials.map((mat, i) => <li key={i}>{mat}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-2"><ClipboardList className="text-accent"/>Activities</h3>
                 <ul className="space-y-4 pt-2 pl-6 border-l-2 border-accent">
                    {lessonPlan.activities.map((act, i) => (
                        <li key={i} className="relative pl-4">
                        <div className="absolute -left-3.5 top-1 w-6 h-6 bg-background border-2 border-accent rounded-full flex items-center justify-center">
                            <Clock className="h-3 w-3 text-accent"/>
                        </div>
                        <p className="font-semibold text-muted-foreground">{act.duration}</p>
                        <p className="font-bold">{act.name}</p>
                        <p>{act.description}</p>
                        </li>
                    ))}
                 </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-2"><CheckCircle className="text-accent"/>Assessment</h3>
                <p className="text-muted-foreground">{lessonPlan.assessment}</p>
              </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !lessonPlan && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center min-h-[400px]">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Ready to plan a lesson?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fill out the form to generate a complete lesson plan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
