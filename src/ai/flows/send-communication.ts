
'use server';
/**
 * @fileOverview An AI agent for sending communications to parents.
 *
 * - sendCommunication - A function that handles drafting and sending messages.
 * - SendCommunicationInput - The input type for the sendCommunication function.
 * - SendCommunicationOutput - The return type for the sendCommunication function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const SendCommunicationInputSchema = z.object({
  message: z.string().describe('The core message or notes from the admin. The AI should expand this into a friendly, clear, and professional announcement.'),
  audience: z.enum(['all_parents', 'preschool_parents', 'afterschool_parents']).describe('The target group for this message.'),
  channels: z.array(z.enum(['email', 'push'])).describe('The channels through which to send the message.'),
});
export type SendCommunicationInput = z.infer<typeof SendCommunicationInputSchema>;

export const SendCommunicationOutputSchema = z.object({
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


const prompt = ai.definePrompt({
  name: 'communicationPrompt',
  input: {schema: SendCommunicationInputSchema},
  system: `You are an expert school administrator, skilled in crafting clear, friendly, and professional communications for parents.
Your primary tasks are to:
1.  Take the user's message/notes and expand it into a well-formatted and professional announcement.
2.  Determine the subject line or title for the message.
3.  Use the provided tools to send the final message through the requested channels (email, push notification).
4.  Do not ask for confirmation. Execute the tools immediately based on the user's request.
5.  The list of recipients is a placeholder; for now, assume there are 25 parents in the selected audience. You should pass an array of 25 placeholder emails (e.g., 'parent1@example.com', 'parent2@example.com', ...) to the tools.`,
  tools: [sendEmailTool, sendPushNotificationTool],
});


const sendCommunicationFlow = ai.defineFlow(
  {
    name: 'sendCommunicationFlow',
    inputSchema: SendCommunicationInputSchema,
    outputSchema: SendCommunicationOutputSchema,
  },
  async (input) => {
    
    const llmResponse = await prompt(input);
    const toolCalls = llmResponse.toolCalls();

    let finalMessage = input.message;
    let successfulChannels: string[] = [];

    for (const toolCall of toolCalls) {
        // Assume the 'body' argument contains the AI-drafted message
        if (toolCall.args.body) {
            finalMessage = toolCall.args.body;
        }

        const toolResponse = await ai.runTool(toolCall);
        
        // If the tool call was successful, add the channel to our list
        if (toolResponse.success) {
            if (toolCall.name === 'sendEmail') {
                successfulChannels.push('email');
            } else if (toolCall.name === 'sendPushNotification') {
                successfulChannels.push('push');
            }
        }
    }

    return {
      sentMessage: finalMessage,
      recipients: 25, // Placeholder value
      channelsUsed: successfulChannels,
    };
  }
);


export async function sendCommunication(input: SendCommunicationInput): Promise<SendCommunicationOutput> {
  return sendCommunicationFlow(input);
}
