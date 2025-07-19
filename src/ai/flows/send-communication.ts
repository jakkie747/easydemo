
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


async function sendEmail(subject: string, body: string, recipientsCount: number) {
    console.log('Simulating sending email to', recipientsCount, 'recipients.');
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return { success: true };
}

async function sendPushNotification(title: string, body: string, recipientsCount: number) {
    console.log('Simulating sending push notification to', recipientsCount, 'recipients.');
     await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
}

async function sendWhatsApp(body: string, recipientsCount: number) {
    console.log('Simulating sending WhatsApp message to', recipientsCount, 'recipients.');
     await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
}

export async function sendCommunication(input: SendCommunicationInput): Promise<SendCommunicationOutput> {
  return sendCommunicationFlow(input);
}

const communicationDraftPrompt = ai.definePrompt({
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


const sendCommunicationFlow = ai.defineFlow(
  {
    name: 'sendCommunicationFlow',
    inputSchema: SendCommunicationInputSchema,
    outputSchema: SendCommunicationOutputSchema,
  },
  async (input) => {
    const { output } = await communicationDraftPrompt({ message: input.message });
    if (!output) {
        throw new Error("Failed to draft the message with the AI.");
    }

    const { subject, body } = output;
    const recipientsCount = 25; // Placeholder value
    const successfulChannels: string[] = [];
    
    for (const channel of input.channels) {
        try {
            let result;
            if (channel === 'email') {
                result = await sendEmail(subject, body, recipientsCount);
                if (result.success) successfulChannels.push('email');
            } else if (channel === 'push') {
                result = await sendPushNotification(subject, body, recipientsCount);
                if (result.success) successfulChannels.push('push');
            } else if (channel === 'whatsapp') {
                result = await sendWhatsApp(body, recipientsCount);
                if (result.success) successfulChannels.push('whatsapp');
            }
        } catch (e) {
            console.error(`Error sending via ${channel}:`, e);
        }
    }

    return {
        sentMessage: body,
        recipients: recipientsCount,
        channelsUsed: successfulChannels,
    };
  }
);
