
// src/ai/flows/generate-activity-ideas.ts
'use server';

/**
 * @fileOverview AI creative assistant for teachers to generate story starters and activity ideas.
 *
 * - generateActivityIdeas - A function that generates story starters and activity ideas.
 * - GenerateActivityIdeasInput - The input type for the generateActivityIdeas function.
 * - GenerateActivityIdeasOutput - The return type for the generateActivityIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActivityIdeasInputSchema = z.object({
  topic: z.string().describe('The topic or theme for the story starters and activity ideas.'),
  gradeLevel: z
    .string()
    .describe('The grade level of the students (e.g., preschool, kindergarten, 1st grade).'),
  numIdeas: z
    .number()
    .default(3)
    .describe('The number of story starters and activity ideas to generate.'),
});
export type GenerateActivityIdeasInput = z.infer<typeof GenerateActivityIdeasInputSchema>;

const GenerateActivityIdeasOutputSchema = z.object({
  storyStarters: z.array(z.string()).describe('A list of story starter ideas.'),
  activityIdeas: z.array(z.string()).describe('A list of activity ideas.'),
});
export type GenerateActivityIdeasOutput = z.infer<typeof GenerateActivityIdeasOutputSchema>;

export async function generateActivityIdeas(input: GenerateActivityIdeasInput): Promise<GenerateActivityIdeasOutput> {
  return generateActivityIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActivityIdeasPrompt',
  input: {schema: GenerateActivityIdeasInputSchema},
  output: {schema: GenerateActivityIdeasOutputSchema},
  prompt: `You are a creative assistant for teachers, helping them generate story starters and activity ideas for their class.

  Generate {{numIdeas}} story starters and {{numIdeas}} activity ideas for the following topic and grade level.

  Topic: {{{topic}}}
  Grade Level: {{{gradeLevel}}}

  Format the output as a JSON object with two keys: storyStarters and activityIdeas. The values should be arrays of strings.
  `,
});

const generateActivityIdeasFlow = ai.defineFlow(
  {
    name: 'generateActivityIdeasFlow',
    inputSchema: GenerateActivityIdeasInputSchema,
    outputSchema: GenerateActivityIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
