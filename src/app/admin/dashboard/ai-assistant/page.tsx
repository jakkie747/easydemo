
'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Skeleton} from '@/components/ui/skeleton';
import {Sparkles, Lightbulb, BookOpen, AlertTriangle} from 'lucide-react';
import {
  generateCreativeIdeas,
  type CreativeIdeaOutput,
} from '@/ai/flows/creative-ideas-flow';

type GenerationType = 'story-starters' | 'activity-ideas';

export default function AiAssistantPage() {
  const [ideas, setIdeas] = useState<CreativeIdeaOutput['ideas']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<GenerationType | null>(
    null
  );

  const handleGenerate = async (type: GenerationType) => {
    setIsLoading(true);
    setError(null);
    setIdeas([]);
    setLastGenerated(type);

    try {
      const result = await generateCreativeIdeas({type});
      setIdeas(result.ideas);
    } catch (err: any) {
      console.error('AI generation error:', err);
      let errorMessage = 'An unexpected error occurred.';
      if (err.message.includes('API key not valid')) {
        errorMessage =
          'The provided Google AI API key is invalid or has expired. Please check your .env.local file.';
      } else if (err.message.includes('429')) {
        errorMessage =
          'You have exceeded your API quota. Please check your Google AI account or try again later.';
      } else if (err.message.includes('not found in environment')) {
        errorMessage =
          'The GOOGLE_API_KEY was not found. Please add it to your .env.local file to enable this feature.';
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-6">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <Sparkles className="text-accent" />
          AI Creative Assistant
        </h2>
        <p className="text-muted-foreground">
          Stuck for ideas? Let our AI assistant help you brainstorm creative and
          engaging activities for your classroom.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate New Ideas</CardTitle>
          <CardDescription>
            Choose a category to get a list of 5 unique, age-appropriate ideas.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button
            onClick={() => handleGenerate('story-starters')}
            disabled={isLoading}
            size="lg"
          >
            <BookOpen className="mr-2" />
            Generate Story Starters
          </Button>
          <Button
            onClick={() => handleGenerate('activity-ideas')}
            disabled={isLoading}
            variant="secondary"
            size="lg"
          >
            <Lightbulb className="mr-2" />
            Generate Activity Ideas
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Generation Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({length: 5}).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-6 w-3/4" />
                  </CardTitle>
                  <CardDescription>
                    <Skeleton className="mt-2 h-4 w-full" />
                    <Skeleton className="mt-1 h-4 w-5/6" />
                  </CardDescription>
                </CardHeader>
              </Card>
            ))
          : ideas.map((idea, index) => (
              <Card
                key={index}
                className="animate-in fade-in-0 zoom-in-95"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <CardHeader>
                  <CardTitle className="flex items-start gap-2 font-headline text-primary/90">
                    {lastGenerated === 'story-starters' ? (
                      <BookOpen className="mt-1 h-5 w-5 shrink-0" />
                    ) : (
                      <Lightbulb className="mt-1 h-5 w-5 shrink-0" />
                    )}
                    <span>{idea.title}</span>
                  </CardTitle>
                  <CardDescription>{idea.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
      </div>
    </div>
  );
}
