'use server';
/**
 * @fileOverview An example AI flow that generates a short story.
 *
 * - generateStory - A function that takes a topic and returns a story.
 * - StoryInput - The input type for the generateStory function.
 * - StoryOutput - The return type for the generateStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const StoryInputSchema = z.object({
  topic: z.string().describe('The topic for the story.'),
});
export type StoryInput = z.infer<typeof StoryInputSchema>;

export const StoryOutputSchema = z.object({
  story: z.string().describe('The generated story.'),
});
export type StoryOutput = z.infer<typeof StoryOutputSchema>;

const storyPrompt = ai.definePrompt({
  name: 'storyPrompt',
  input: {
    schema: StoryInputSchema,
  },
  output: {
    schema: StoryOutputSchema,
  },
  prompt: 'Write a short, fun story about {{{topic}}}.',
});

const storyFlow = ai.defineFlow(
  {
    name: 'storyFlow',
    inputSchema: StoryInputSchema,
    outputSchema: StoryOutputSchema,
  },
  async (input) => {
    // To change the model, you would modify the model name below.
    // For example, you could use 'googleai/gemini-1.5-pro-latest'.
    const llmResponse = await storyPrompt({
        topic: input.topic,
      },
      {
        model: 'googleai/gemini-1.5-flash-latest',
      }
    );

    return llmResponse.output()!;
  }
);

export async function generateStory(input: StoryInput): Promise<StoryOutput> {
  return storyFlow(input);
}
