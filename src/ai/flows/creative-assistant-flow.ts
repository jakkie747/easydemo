
'use server';
/**
 * @fileOverview An AI agent for generating creative ideas for a preschool.
 *
 * - getCreativeIdea - A function that generates ideas.
 * - CreativeIdeaInput - The input type for the getCreativeIdea function.
 * - CreativeIdeaOutput - The return type for the getCreativeIdea function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const CreativeIdeaInputSchema = z.object({
  type: z
    .enum(['story', 'activity'])
    .describe('The type of idea to generate.'),
});
export type CreativeIdeaInput = z.infer<typeof CreativeIdeaInputSchema>;

export const CreativeIdeaOutputSchema = z.object({
  ideas: z
    .array(z.string())
    .length(5)
    .describe('A list of 5 generated ideas.'),
});
export type CreativeIdeaOutput = z.infer<typeof CreativeIdeaOutputSchema>;

export async function getCreativeIdea(
  input: CreativeIdeaInput
): Promise<CreativeIdeaOutput> {
  return creativeAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'creativeAssistantPrompt',
  input: { schema: CreativeIdeaInputSchema },
  output: { schema: CreativeIdeaOutputSchema },
  prompt: `You are a creative assistant for a preschool. Your task is to generate 5 unique, age-appropriate ideas.
  
The user wants ideas for the following type: {{{type}}}.

If the type is 'story', generate 5 creative story starters that young children can build upon.
If the type is 'activity', generate 5 fun and educational activity ideas that can be done in a classroom setting.

Please provide the output as a list of 5 strings.`,
});

const creativeAssistantFlow = ai.defineFlow(
  {
    name: 'creativeAssistantFlow',
    inputSchema: CreativeIdeaInputSchema,
    outputSchema: CreativeIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate ideas.');
    }
    return output;
  }
);
