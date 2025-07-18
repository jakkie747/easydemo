
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
import { generateStudentPraise, type GenerateStudentPraiseOutput } from "@/ai/flows/generate-student-praise";
import { Loader2, Sparkles, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GenerateStudentPraiseInputSchema = z.object({
  studentName: z.string().describe("The student's name."),
  accomplishment: z.string().describe('A specific, positive observation about the student.'),
  areaOfFocus: z.enum(['Social Skills', 'Creativity', 'Problem Solving', 'Kindness', 'Effort']).describe('The primary developmental area the accomplishment falls under.'),
});

export function StudentPraiseForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [praise, setPraise] = useState<GenerateStudentPraiseOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<import("zod").z.infer<typeof GenerateStudentPraiseInputSchema>>({
    resolver: zodResolver(GenerateStudentPraiseInputSchema),
    defaultValues: {
      studentName: "Leo",
      accomplishment: "Shared his favorite truck with a new friend without being asked.",
      areaOfFocus: "Kindness",
    },
  });

  async function onSubmit(values: import("zod").z.infer<typeof GenerateStudentPraiseInputSchema>) {
    setIsLoading(true);
    setPraise(null);
    try {
      const result = await generateStudentPraise(values);
      setPraise(result);
    } catch (error) {
      console.error("Failed to generate student praise:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem generating the praise.",
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
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sarah" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accomplishment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accomplishment / Observation</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Helped a friend tie their shoe." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areaOfFocus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area of Focus</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select an area" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Social Skills">Social Skills</SelectItem>
                      <SelectItem value="Creativity">Creativity</SelectItem>
                      <SelectItem value="Problem Solving">Problem Solving</SelectItem>
                      <SelectItem value="Kindness">Kindness</SelectItem>
                      <SelectItem value="Effort">Effort</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Praise
            </Button>
          </form>
        </Form>
      </div>
      <div className="md:col-span-1 lg:col-span-2">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center animate-pulse">
            <Star className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Finding the perfect words...</p>
          </div>
        )}
        {praise && (
          <Card className="shadow-lg bg-gradient-to-br from-primary/10 to-background">
             <CardContent className="pt-6">
                <div className="text-center">
                    <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                    <blockquote className="text-xl italic text-foreground font-semibold">
                        "{praise.praise}"
                    </blockquote>
                </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !praise && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center min-h-[400px]">
            <Star className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Ready to share some kudos?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fill out the form to generate a personalized note of praise.</p>
          </div>
        )}
      </div>
    </div>
  );
}
