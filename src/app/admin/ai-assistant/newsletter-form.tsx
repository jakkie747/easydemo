
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateNewsletterSnippet, type GenerateNewsletterSnippetOutput } from "@/ai/flows/generate-newsletter-snippet";
import { Loader2, Sparkles, Newspaper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GenerateNewsletterSnippetInputSchema = z.object({
  tone: z.enum(['Friendly & Fun', 'Professional & Informative', 'Warm & Caring']).describe('The desired tone for the newsletter.'),
  keyPoints: z.string().describe('Bullet points or a brief summary of the topics to cover. Each point should be on a new line.'),
  specialMentions: z.string().optional().describe('Any special announcements or shout-outs to include.'),
});

export function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [snippet, setSnippet] = useState<GenerateNewsletterSnippetOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<import("zod").z.infer<typeof GenerateNewsletterSnippetInputSchema>>({
    resolver: zodResolver(GenerateNewsletterSnippetInputSchema),
    defaultValues: {
      tone: "Friendly & Fun",
      keyPoints: "- We learned about different farm animals this week!\n- Arts & Crafts: We made paper plate pigs.\n- Next week's theme is 'Community Helpers'.",
      specialMentions: "Picture day is this Friday!",
    },
  });

  async function onSubmit(values: import("zod").z.infer<typeof GenerateNewsletterSnippetInputSchema>) {
    setIsLoading(true);
    setSnippet(null);
    try {
      const result = await generateNewsletterSnippet(values);
      setSnippet(result);
    } catch (error) {
      console.error("Failed to generate newsletter snippet:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem generating the newsletter snippet.",
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
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone of Voice</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a tone" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Friendly & Fun">Friendly & Fun</SelectItem>
                      <SelectItem value="Professional & Informative">Professional & Informative</SelectItem>
                      <SelectItem value="Warm & Caring">Warm & Caring</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Points</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="- Point 1&#10;- Point 2&#10;- Point 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="specialMentions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Mentions (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Picture Day is Friday!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Newsletter
            </Button>
          </form>
        </Form>
      </div>
      <div className="md:col-span-1 lg:col-span-2">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center animate-pulse">
            <Newspaper className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Writing your newsletter...</p>
          </div>
        )}
        {snippet && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">{snippet.headline}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap">
                    {snippet.body}
                </div>
            </CardContent>
          </Card>
        )}
        {!isLoading && !snippet && (
          <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center min-h-[400px]">
            <Newspaper className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Ready to draft a newsletter?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Fill out the form to generate a snippet for parents.</p>
          </div>
        )}
      </div>
    </div>
  );
}
