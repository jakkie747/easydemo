
'use server';
/**
 * @fileOverview AI assistant for generating parent newsletter snippets.
 *
 * - generateNewsletterSnippet - A function that generates a newsletter snippet.
 * - GenerateNewsletterSnippetInput - The input type for the function.
 * - GenerateNewsletterSnippetOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNewsletterSnippetInputSchema = z.object({
  tone: z.enum(['Friendly & Fun', 'Professional & Informative', 'Warm & Caring']).describe('The desired tone for the newsletter.'),
  keyPoints: z.string().describe('Bullet points or a brief summary of the topics to cover. Each point should be on a new line.'),
  specialMentions: z.string().optional().describe('Any special announcements or shout-outs to include.'),
});
export type GenerateNewsletterSnippetInput = z.infer<typeof GenerateNewsletterSnippetInputSchema>;

const GenerateNewsletterSnippetOutputSchema = z.object({
  headline: z.string().describe('A catchy headline for the newsletter snippet.'),
  body: z.string().describe('The full body of the newsletter, formatted with paragraphs.'),
});
export type GenerateNewsletterSnippetOutput = z.infer<typeof GenerateNewsletterSnippetOutputSchema>;

export async function generateNewsletterSnippet(input: GenerateNewsletterSnippetInput): Promise<GenerateNewsletterSnippetOutput> {
  return generateNewsletterSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNewsletterSnippetPrompt',
  input: {schema: GenerateNewsletterSnippetInputSchema},
  output: {schema: GenerateNewsletterSnippetOutputSchema},
  prompt: `You are an expert at writing communications for a preschool/daycare. Your task is to write a newsletter snippet for parents based on the provided information.

  Tone: {{{tone}}}

  Key Points to Cover:
  {{{keyPoints}}}

  {{#if specialMentions}}
  Special Announcements:
  {{{specialMentions}}}
  {{/if}}

  Write a newsletter snippet with a catchy headline and a body that incorporates the key points and special mentions in the specified tone. The body should be engaging, easy to read, and appropriate for parents.
  `,
});

const generateNewsletterSnippetFlow = ai.defineFlow(
  {
    name: 'generateNewsletterSnippetFlow',
    inputSchema: GenerateNewsletterSnippetInputSchema,
    outputSchema: GenerateNewsletterSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
