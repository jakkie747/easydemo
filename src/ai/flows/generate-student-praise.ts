
'use server';
/**
 * @fileOverview AI assistant for generating personalized student praise.
 *
 * - generateStudentPraise - A function that generates a personalized praise message.
 * - GenerateStudentPraiseInput - The input type for the function.
 * - GenerateStudentPraiseOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudentPraiseInputSchema = z.object({
  studentName: z.string().describe("The student's name."),
  accomplishment: z.string().describe('A specific, positive observation about the student.'),
  areaOfFocus: z.enum(['Social Skills', 'Creativity', 'Problem Solving', 'Kindness', 'Effort']).describe('The primary developmental area the accomplishment falls under.'),
});
export type GenerateStudentPraiseInput = z.infer<typeof GenerateStudentPraiseInputSchema>;

const GenerateStudentPraiseOutputSchema = z.object({
  praise: z.string().describe('A unique, encouraging, and personalized message of praise for the student.'),
});
export type GenerateStudentPraiseOutput = z.infer<typeof GenerateStudentPraiseOutputSchema>;

export async function generateStudentPraise(input: GenerateStudentPraiseInput): Promise<GenerateStudentPraiseOutput> {
  return generateStudentPraiseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStudentPraisePrompt',
  input: {schema: GenerateStudentPraiseInputSchema},
  output: {schema: GenerateStudentPraiseOutputSchema},
  prompt: `You are a preschool teacher who is an expert in positive reinforcement. Your task is to write a short, unique, and encouraging note of praise for a student. Avoid generic phrases like "Good job" or "Awesome".

  Student's Name: {{{studentName}}}
  Accomplishment: {{{accomplishment}}}
  Area of Focus: {{{areaOfFocus}}}

  Based on this, generate one creative and heartfelt sentence of praise that the teacher can write on a note to the student or their parents.
  `,
});

const generateStudentPraiseFlow = ai.defineFlow(
  {
    name: 'generateStudentPraiseFlow',
    inputSchema: GenerateStudentPraiseInputSchema,
    outputSchema: GenerateStudentPraiseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
