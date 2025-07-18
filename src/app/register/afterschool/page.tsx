
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const registrationSchema = z.object({
  // Child Info
  childFirstName: z.string().min(1, "Child's first name is required."),
  childLastName: z.string().min(1, "Child's last name is required."),
  childGrade: z.string().min(1, "Child's grade level is required."),

  // Parent Info
  parentFirstName: z.string().min(1, "Your first name is required."),
  parentLastName: z.string().min(1, "Your last name is required."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phone: z.string().min(1, "Your phone number is required."),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function AfterschoolRegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      childFirstName: "",
      childLastName: "",
      childGrade: "",
      parentFirstName: "",
      parentLastName: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true);
    try {
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
    <div className="py-12 px-4 bg-background">
      <div className="container mx-auto">
        <Card className="max-w-3xl mx-auto shadow-lg border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Afterschool Registration</CardTitle>
            <CardDescription>Complete the form to enroll in our afterschool program.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <section>
                  <h3 className="text-xl font-semibold border-b mb-4 pb-2 font-headline text-primary/90">Child's Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="childFirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl><Input placeholder="Alex" {...field} /></FormControl>
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
                            <FormControl><Input placeholder="Jones" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="childGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grade Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select a grade" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="kindergarten">Kindergarten</SelectItem>
                              <SelectItem value="1st grade">1st Grade</SelectItem>
                              <SelectItem value="2nd grade">2nd Grade</SelectItem>
                              <SelectItem value="3rd grade">3rd Grade</SelectItem>
                              <SelectItem value="4th grade">4th Grade</SelectItem>
                              <SelectItem value="5th grade">5th Grade</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold border-b mb-4 pb-2 font-headline text-primary/90">Parent/Guardian Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormField
                        control={form.control}
                        name="parentFirstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl><Input placeholder="Sam" {...field} /></FormControl>
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
                            <FormControl><Input placeholder="Jones" {...field} /></FormControl>
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
                          <FormControl><Input type="email" placeholder="sam.jones@example.com" {...field} /></FormControl>
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
                          <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
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
                          <FormControl><Input type="tel" placeholder="123-456-7890" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" disabled={isLoading}>
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
