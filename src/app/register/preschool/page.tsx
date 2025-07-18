
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const registrationSchema = z.object({
  // Child Info
  childFirstName: z.string().min(1, "Child's first name is required."),
  childLastName: z.string().min(1, "Child's last name is required."),
  childDob: z.string().min(1, "Child's date of birth is required."),
  allergies: z.string().optional(),

  // Parent Info
  parentFirstName: z.string().min(1, "Your first name is required."),
  parentLastName: z.string().min(1, "Your last name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phone: z.string().min(1, "Your phone number is required."),

  // Emergency Contact
  emergencyName: z.string().min(1, "Emergency contact name is required."),
  emergencyRelation: z.string().min(1, "Relationship to child is required."),
  emergencyPhone: z.string().min(1, "Emergency contact phone is required."),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function PreschoolRegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      childFirstName: "",
      childLastName: "",
      childDob: "",
      allergies: "",
      parentFirstName: "",
      parentLastName: "",
      email: "",
      password: "",
      phone: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true);
    try {
      // For this demo, we'll use the parent's info to create the user account.
      // In a real app, you would save all this data to a database like Firestore.
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Registration Successful!",
        description: "Your account has been created. Welcome to Easyspark!",
      });
      router.push("/parent/dashboard");
    } catch (error: any) {
      console.error(error);
      let errorMessage = "An unknown error occurred.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email address is already in use. Please use a different one or log in.";
      }
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Preschool Registration</CardTitle>
            <CardDescription>Complete the form below to enroll your child in our preschool program.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Child's Information Section */}
                <section>
                  <h3 className="text-lg font-semibold border-b mb-4 pb-2">1. Child's Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="childFirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Leo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="childLastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Bloom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="childDob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allergies & Medical Notes</FormLabel>
                          <FormControl>
                            <Textarea placeholder="List any allergies or important medical information." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                {/* Parent's Information Section */}
                <section>
                  <h3 className="text-lg font-semibold border-b mb-4 pb-2">2. Parent/Guardian & Account Info</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormField
                        control={form.control}
                        name="parentFirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Anna" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="parentLastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Bloom" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="anna.bloom@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="123-456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>
                
                {/* Emergency Contact Section */}
                 <section>
                  <h3 className="text-lg font-semibold border-b mb-4 pb-2">3. Emergency Contact</h3>
                   <div className="space-y-4">
                     <FormField
                      control={form.control}
                      name="emergencyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Bloom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="emergencyRelation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship to Child</FormLabel>
                          <FormControl>
                            <Input placeholder="Father" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="emergencyPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="123-456-7891" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                       {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                       Submit Registration
                    </Button>
                </div>
              </form>
            </Form>
          </CardContent>
           <CardFooter className="justify-center">
              <Button variant="link" asChild>
                  <Link href="/"><ArrowLeft/> Back to Home</Link>
              </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
