
'use server';
/**
 * @fileOverview An AI agent for sending communications to parents.
 *
 * - sendCommunication - A function that handles drafting and sending messages.
 * - SendCommunicationInput - The input type for the sendCommunication function.
 * - SendCommunicationOutput - The return type for the sendCommunication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SendCommunicationInputSchema = z.object({
  message: z.string().describe('The core message or notes from the admin. The AI should expand this into a friendly, clear, and professional announcement.'),
  audience: z.enum(['all_parents', 'preschool_parents', 'afterschool_parents']).describe('The target group for this message.'),
  channels: z.array(z.enum(['email', 'push', 'whatsapp'])).describe('The channels through which to send the message.'),
});
export type SendCommunicationInput = z.infer<typeof SendCommunicationInputSchema>;

const SendCommunicationOutputSchema = z.object({
  sentMessage: z.string().describe('The final, AI-drafted message that was sent.'),
  recipients: z.number().describe('The number of parents the message was sent to.'),
  channelsUsed: z.array(z.string()).describe('A list of channels that were successfully used.'),
});
export type SendCommunicationOutput = z.infer<typeof SendCommunicationOutputSchema>;

// This file is being deprecated in favor of a standard server action in `src/app/admin/communications/actions.ts`
// This is to work around a persistent serialization issue with Genkit flows and Next.js.
// The core prompt logic is kept here for the new action to use.

export const communicationDraftPrompt = ai.definePrompt({
    name: 'communicationDraftPrompt',
    model: 'googleai/gemini-pro',
    inputSchema: z.object({
        message: z.string(),
    }),
    outputSchema: z.object({
        subject: z.string().describe("A suitable subject line or title for the message."),
        body: z.string().describe("The full, professionally drafted message body."),
    }),
    prompt: `You are an expert school administrator, skilled in crafting clear, friendly, and professional communications for parents.
Take the user's message/notes below and expand it into a well-formatted and professional announcement.

User notes: {{{message}}}
`,
});

// Deprecated function. Use the server action instead.
export async function sendCommunication(input: SendCommunicationInput): Promise<SendCommunicationOutput> {
  throw new Error("This function is deprecated. Please use the server action in `src/app/admin/communications/actions.ts`");
}
