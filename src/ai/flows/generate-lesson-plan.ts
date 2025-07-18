
'use server';
/**
 * @fileOverview AI assistant for generating lesson plans.
 *
 * - generateLessonPlan - A function that generates a lesson plan.
 * - GenerateLessonPlanInput - The input type for the generateLessonPlan function.
 * - GenerateLessonPlanOutput - The return type for the generateLessonPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonPlanInputSchema = z.object({
  topic: z.string().describe('The main topic or theme for the lesson.'),
  gradeLevel: z.string().describe('The grade level of the students.'),
  duration: z.string().describe('The estimated duration of the lesson (e.g., 30 minutes, 1 hour).'),
});
export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;

const GenerateLessonPlanOutputSchema = z.object({
  title: z.string().describe('A creative title for the lesson plan.'),
  learningObjectives: z.array(z.string()).describe('A list of what students will be able to do after the lesson.'),
  materials: z.array(z.string()).describe('A list of materials needed for the lesson.'),
  activities: z.array(z.object({
    name: z.string().describe('The name of the activity.'),
    description: z.string().describe('A detailed description of the activity.'),
    duration: z.string().describe('The estimated time for this activity.'),
  })).describe('A list of activities to be performed during the lesson.'),
  assessment: z.string().describe('How to assess student learning.'),
});
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;

export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  return generateLessonPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonPlanPrompt',
  input: {schema: GenerateLessonPlanInputSchema},
  output: {schema: GenerateLessonPlanOutputSchema},
  prompt: `You are an expert curriculum designer for early childhood education. Your task is to create a detailed, engaging, and age-appropriate lesson plan.

  Topic: {{{topic}}}
  Grade Level: {{{gradeLevel}}}
  Lesson Duration: {{{duration}}}

  Generate a complete lesson plan with a creative title, clear learning objectives, a list of necessary materials, a sequence of activities with descriptions and timings, and a simple method for assessment.
  `,
});

const generateLessonPlanFlow = ai.defineFlow(
  {
    name: 'generateLessonPlanFlow',
    inputSchema: GenerateLessonPlanInputSchema,
    outputSchema: GenerateLessonPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
