
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { sendCommunication, type SendCommunicationOutput } from "@/ai/flows/send-communication";
import { Loader2, Send, MessageSquare, Mail, Bell, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const channels = [
  { id: "email", label: "Email", icon: Mail },
  { id: "push", label: "Push Notification", icon: Bell },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
] as const;


const formSchema = z.object({
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  audience: z.string().min(1, { message: "Please select an audience." }),
  channels: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one channel.",
  }),
});

export default function CommunicationsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SendCommunicationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "Reminder: Picture Day is this Friday! Please have your child wear their favorite outfit.",
      audience: "all_parents",
      channels: ["email"],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await sendCommunication({
        ...values,
        channels: values.channels as Array<'email' | 'push' | 'whatsapp'>
      });
      setResult(response);
      toast({
        title: "Communication Sent!",
        description: `Your message has been processed for ${response.recipients} recipient(s).`,
      });
    } catch (error) {
      console.error("Failed to send communication:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem sending your message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
            <MessageSquare/> Communications
        </h1>
        <p className="text-muted-foreground">
          Send announcements and updates to parents via multiple channels.
        </p>
      </div>

       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1 h-fit">
            <Card>
                <CardHeader>
                    <CardTitle>Compose Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message Content</FormLabel>
                                <FormControl>
                                <Textarea
                                    placeholder="Type your announcement here..."
                                    rows={6}
                                    {...field}
                                />
                                </FormControl>
                                <FormDescription>
                                The AI will draft a complete message based on your notes.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="audience"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Audience</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select an audience" /></SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="all_parents">All Parents</SelectItem>
                                    <SelectItem value="preschool_parents">Preschool Parents Only</SelectItem>
                                    <SelectItem value="afterschool_parents">Afterschool Parents Only</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                        <FormField
                            control={form.control}
                            name="channels"
                            render={() => (
                                <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">Delivery Channels</FormLabel>
                                    <FormDescription>
                                    Select where to send this message.
                                    </FormDescription>
                                </div>
                                {channels.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="channels"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...field.value, item.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item.id
                                                        )
                                                    )
                                                }}
                                            />
                                            </FormControl>
                                            <FormLabel className="font-normal flex items-center gap-2">
                                              <item.icon className="h-4 w-4 text-muted-foreground" /> {item.label}
                                            </FormLabel>
                                        </FormItem>
                                        )
                                    }}
                                    />
                                ))}
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                            <Send className="mr-2 h-4 w-4" />
                            )}
                            Send Communication
                        </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1 lg:col-span-2">
            {isLoading && (
            <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center animate-pulse">
                <Send className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Sending your message...</p>
            </div>
            )}
            {result && (
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Broadcast Sent!</CardTitle>
                    <CardDescription>
                        Summary of the communication sent to {result.recipients} recipients.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Final Message:</h4>
                         <div className="prose prose-sm max-w-none text-muted-foreground bg-secondary/50 p-4 rounded-md whitespace-pre-wrap">
                            {result.sentMessage}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">Channels Used:</h4>
                        <ul className="list-disc list-inside text-muted-foreground">
                           {result.channelsUsed.map(c => <li key={c} className="capitalize">{c}</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>
            )}
            {!isLoading && !result && (
            <div className="flex flex-col items-center justify-center h-full rounded-lg border border-dashed p-8 text-center min-h-[400px]">
                <MessageSquare className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Ready to send an update?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form to send a message to parents.
                </p>
            </div>
            )}
        </div>
        </div>
    </div>
  );
}
