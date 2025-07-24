
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2, BookOpen } from 'lucide-react';
// import { getCreativeIdea } from '@/ai/flows/creative-assistant-flow';

type IdeaType = 'story' | 'activity';

export default function AiAssistantPage() {
  const [ideas, setIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIdeaType, setCurrentIdeaType] = useState<IdeaType | null>(null);
  const { toast } = useToast();

  const handleGenerate = async (type: IdeaType) => {
    setIsLoading(true);
    setIdeas([]);
    setCurrentIdeaType(type);
    toast({
      variant: 'destructive',
      title: 'Feature Unavailable',
      description:
        'The AI Assistant is temporarily disabled due to a configuration issue.',
    });
    setIsLoading(false);
    // try {
    //   const result = await getCreativeIdea({ type });
    //   setIdeas(result.ideas);
    // } catch (error) {
    //   console.error('AI generation failed:', error);
    //   toast({
    //     variant: 'destructive',
    //     title: 'Generation Failed',
    //     description:
    //       'Could not generate ideas. Please check the console for errors.',
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Sparkles /> AI Creative Assistant
        </h1>
        <p className="text-muted-foreground">
          Generate ideas for classroom activities and story starters.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Idea Generator</CardTitle>
          <CardDescription>
            Select a category to generate 5 unique, age-appropriate ideas using
            generative AI. (This feature is temporarily disabled)
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => handleGenerate('story')}
            disabled={true}
            size="lg"
          >
            {isLoading && currentIdeaType === 'story' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BookOpen className="mr-2 h-4 w-4" />
            )}
            Generate Story Starters
          </Button>
          <Button
            onClick={() => handleGenerate('activity')}
            disabled={true}
            size="lg"
            variant="secondary"
          >
            {isLoading && currentIdeaType === 'activity' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Activity Ideas
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground mt-4">Generating ideas...</p>
        </div>
      )}

      {ideas.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  Idea #{index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{idea}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
