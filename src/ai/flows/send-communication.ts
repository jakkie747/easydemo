
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
import {googleAI} from '@genkit-ai/googleai';

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

// Mock/Placeholder Tools
const sendEmailTool = ai.defineTool(
    {
        name: 'sendEmail',
        description: 'Sends an email to a list of recipients.',
        inputSchema: z.object({
            subject: z.string(),
            body: z.string(),
            recipients: z.array(z.string()),
        }),
        outputSchema: z.object({
            success: z.boolean(),
            message: z.string(),
        }),
    },
    async (input) => {
        console.log('Simulating sending email:', input);
        // In a real app, you would integrate with an email service like SendGrid or Mailgun.
        return { success: true, message: `Email sent to ${input.recipients.length} recipients.` };
    }
);

const sendPushNotificationTool = ai.defineTool(
    {
        name: 'sendPushNotification',
        description: 'Sends a push notification to a list of recipients.',
        inputSchema: z.object({
            title: z.string(),
            body: z.string(),
            recipients: z.array(z.string()),
        }),
        outputSchema: z.object({
            success: z.boolean(),
            message: z.string(),
        }),
    },
    async (input) => {
        console.log('Simulating sending push notification:', input);
        // In a real app, you would integrate with Firebase Cloud Messaging (FCM).
        return { success: true, message: `Push notification sent to ${input.recipients.length} recipients.` };
    }
);

const sendWhatsAppTool = ai.defineTool(
    {
        name: 'sendWhatsApp',
        description: 'Sends a WhatsApp message to a list of recipients.',
        inputSchema: z.object({
            body: z.string(),
            recipients: z.array(z.string()),
        }),
        outputSchema: z.object({
            success: z.boolean(),
            message: z.string(),
        }),
    },
    async (input) => {
        console.log('Simulating sending WhatsApp message:', input);
        // In a real app, you would integrate with a service like Twilio.
        return { success: true, message: `WhatsApp message sent to ${input.recipients.length} recipients.` };
    }
);


const communicationDraftPrompt = ai.definePrompt({
    name: 'communicationDraftPrompt',
    model: googleAI('gemini-pro'),
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
    // 1. Generate the polished message from the user's notes.
    const { output } = await communicationDraftPrompt({ message: input.message });
    if (!output) {
      throw new Error("Failed to draft the message.");
    }

    const { subject, body } = output;
    const recipientsCount = 25; // Placeholder value
    const placeholderRecipients = Array.from({ length: recipientsCount }, (_, i) => `parent${i + 1}@example.com`);
    const successfulChannels: string[] = [];
    
    // 2. Send the message through the selected channels.
    for (const channel of input.channels) {
        try {
            let result;
            if (channel === 'email') {
                result = await sendEmailTool({ subject, body, recipients: placeholderRecipients });
                if (result.success) successfulChannels.push('email');
            } else if (channel === 'push') {
                result = await sendPushNotificationTool({ title: subject, body, recipients: placeholderRecipients });
                if (result.success) successfulChannels.push('push');
            } else if (channel === 'whatsapp') {
                result = await sendWhatsAppTool({ body, recipients: placeholderRecipients });
                if (result.success) successfulChannels.push('whatsapp');
            }
        } catch (e) {
            console.error(`Error sending via ${channel}:`, e);
        }
    }

    // 3. Return a clean, serializable result.
    return {
      sentMessage: body,
      recipients: recipientsCount,
      channelsUsed: successfulChannels,
    };
  }
);


export async function sendCommunication(input: SendCommunicationInput): Promise<SendCommunicationOutput> {
  return sendCommunicationFlow(input);
}
