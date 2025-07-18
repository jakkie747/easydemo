"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { generateActivityIdeas } from "@/ai/flows/generate-activity-ideas";
import type { GenerateActivityIdeasOutput } from "@/ai/flows/generate-activity-ideas";
import { Loader2, Sparkles, BookOpen, ToyBrick } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  gradeLevel: z.string().min(1, { message: "Please select a grade level." }),
  numIdeas: z.coerce.number().min(1).max(5),
});

export function CreativeAssistantForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<GenerateActivityIdeasOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "space exploration",
      gradeLevel: "kindergarten",
      numIdeas: 3,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIdeas(null);
    try {
      const result = await generateActivityIdeas(values);
      setIdeas(result);
    } catch (error) {
      console.error("Failed to generate ideas:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
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
                      <Input placeholder="e.g., dinosaurs" {...field} />
                    </FormControl>
                    <FormDescription>
                      What theme do you want ideas for?
                    </FormDescription>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a grade level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="preschool">Preschool</SelectItem>
                        <SelectItem value="kindergarten">Kindergarten</SelectItem>
                        <SelectItem value="1st grade">1st Grade</SelectItem>
                        <SelectItem value="2nd grade">2nd Grade</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numIdeas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Ideas (1-5)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Ideas
              </Button>
            </form>
          </Form>
      </div>
      <div className="md:col-span-1 lg:col-span-2">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center animate-pulse">
            <Sparkles className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Generating brilliant ideas...</p>
          </div>
        )}
        {ideas && (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <BookOpen className="text-accent" /> Story Starters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {ideas.storyStarters.map((idea, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{idea}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <ToyBrick className="text-accent" /> Activity Ideas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {ideas.activityIdeas.map((idea, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-muted-foreground">{idea}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
        {!isLoading && !ideas && (
           <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center min-h-[400px]">
             <Sparkles className="h-12 w-12 text-muted-foreground" />
             <h3 className="mt-4 text-lg font-semibold">Ready for some inspiration?</h3>
             <p className="mt-2 text-sm text-muted-foreground">
               Fill out the form to generate creative ideas for your class.
             </p>
           </div>
        )}
      </div>
    </div>
  );
}
