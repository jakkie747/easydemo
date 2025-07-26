
'use server';
/**
 * @fileOverview A flow for generating creative ideas for a preschool classroom.
 *
 * - generateCreativeIdeas - Generates story starters or activity ideas.
 * - CreativeIdeaInput - The input type for the generateCreativeIdeas function.
 * - CreativeIdeaOutput - The return type for the generateCreativeIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const IdeaSchema = z.object({
    title: z.string().describe('A short, catchy title for the idea.'),
    description: z.string().describe('A one or two sentence description of the idea, suitable for a preschool teacher.'),
});

const CreativeIdeaInputSchema = z.object({
  type: z.enum(['story-starters', 'activity-ideas']).describe('The type of creative idea to generate.'),
});
export type CreativeIdeaInput = z.infer<typeof CreativeIdeaInputSchema>;

const CreativeIdeaOutputSchema = z.object({
    ideas: z.array(IdeaSchema).length(5).describe('An array of exactly 5 unique ideas.'),
});
export type CreativeIdeaOutput = z.infer<typeof CreativeIdeaOutputSchema>;

export async function generateCreativeIdeas(
  input: CreativeIdeaInput
): Promise<CreativeIdeaOutput> {
  return generateCreativeIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'creativeIdeasPrompt',
  input: {schema: CreativeIdeaInputSchema},
  output: {schema: CreativeIdeaOutputSchema},
  prompt: `
    You are an AI assistant for a preschool teacher. Your goal is to provide creative, age-appropriate ideas to prevent creative block and inspire fun lessons.

    The user will specify whether they want "story-starters" or "activity-ideas".

    Based on the user's request for '{{type}}', generate 5 unique ideas.
    
    - If the user asks for story starters, the title should be the starter itself (e.g., "The Little Bear Who Couldn't Roar...") and the description can be a sentence to expand on it.
    - If the user asks for activity ideas, the title should be the name of the activity (e.g., "Nature Paintbrushes") and the description should briefly explain the activity.

    The ideas should be simple, engaging, and suitable for children aged 3-5.
  `,
});

const generateCreativeIdeasFlow = ai.defineFlow(
  {
    name: 'generateCreativeIdeasFlow',
    inputSchema: CreativeIdeaInputSchema,
    outputSchema: CreativeIdeaOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
