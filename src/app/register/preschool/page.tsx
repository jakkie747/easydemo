
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
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addParent, addChild } from "@/lib/firestore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const registrationSchema = z.object({
  // Child Info
  childFirstName: z.string().min(1, "Child's first name is required."),
  childLastName: z.string().min(1, "Child's last name is required."),
  childDob: z.string().min(1, "Child's date of birth is required."),
  childGender: z.string().min(1, "Gender is required."),
  allergies: z.string().optional(),
  previousExperience: z.enum(['yes', 'no']),
  additionalNotes: z.string().optional(),

  // Parent Info
  parentFirstName: z.string().min(1, "Your first name is required."),
  parentLastName: z.string().min(1, "Your last name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(1, "Your phone number is required."),
  address: z.string().min(1, "Your address is required."),
  
  // Account
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Please confirm your password."),

  // Emergency Contact
  emergencyName: z.string().min(1, "Emergency contact name is required."),
  emergencyRelation: z.string().min(1, "Relationship to child is required."),
  emergencyPhone: z.string().min(1, "Emergency contact phone is required."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function PreschoolRegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      childFirstName: "",
      childLastName: "",
      childDob: "",
      childGender: "",
      allergies: "",
      previousExperience: "no",
      additionalNotes: "",
      parentFirstName: "",
      parentLastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      const childName = `${values.childFirstName} ${values.childLastName}`;
      const parentName = `${values.parentFirstName} ${values.parentLastName}`;

      await addParent({
          id: user.uid,
          name: parentName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          avatar: `https://placehold.co/150x150.png`,
          children: [childName],
      });
      
      await addChild({
          name: childName,
          dob: values.childDob,
          gender: values.childGender,
          parent: parentName,
          parentId: user.uid,
          allergies: values.allergies,
          previousExperience: values.previousExperience === 'yes',
          additionalNotes: values.additionalNotes,
          emergencyContact: {
              name: values.emergencyName,
              relation: values.emergencyRelation,
              phone: values.emergencyPhone,
          },
          avatar: `https://placehold.co/150x150.png`,
          classroom: 'Bumblebees', // default classroom for now
          age: new Date().getFullYear() - new Date(values.childDob).getFullYear(),
      });


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
            <CardTitle className="font-headline text-4xl text-primary">Preschool Registration</CardTitle>
            <CardDescription>Complete the form below to enroll your child in our preschool program.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <section>
                  <h3 className="text-xl font-semibold border-b mb-4 pb-2 font-headline text-primary/90">1. Child's Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="childFirstName" render={({ field }) => ( <FormItem> <FormLabel>First Name</FormLabel> <FormControl> <Input placeholder="Leo" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                      <FormField control={form.control} name="childLastName" render={({ field }) => ( <FormItem> <FormLabel>Last Name</FormLabel> <FormControl> <Input placeholder="Bloom" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="childDob" render={({ field }) => ( <FormItem> <FormLabel>Date of Birth</FormLabel> <FormControl> <Input type="date" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                        <FormField control={form.control} name="childGender" render={({ field }) => ( <FormItem> <FormLabel>Gender</FormLabel> <FormControl> <Input placeholder="e.g. Male, Female, Non-binary" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    </div>
                    <FormField control={form.control} name="allergies" render={({ field }) => ( <FormItem> <FormLabel>Allergies & Medical Notes (optional)</FormLabel> <FormControl> <Textarea placeholder="List any allergies or important medical information." {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="previousExperience" render={({ field }) => ( <FormItem className="space-y-3"> <FormLabel>Previous preschool experience?</FormLabel> <FormControl> <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center space-x-4"> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl><RadioGroupItem value="yes" /></FormControl> <FormLabel className="font-normal">Yes</FormLabel> </FormItem> <FormItem className="flex items-center space-x-2 space-y-0"> <FormControl><RadioGroupItem value="no" /></FormControl> <FormLabel className="font-normal">No</FormLabel> </FormItem> </RadioGroup> </FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="additionalNotes" render={({ field }) => ( <FormItem> <FormLabel>Additional Notes (optional)</FormLabel> <FormControl> <Textarea placeholder="Anything else we should know?" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                     <div className="space-y-2">
                        <FormLabel>Child's Photo (optional)</FormLabel>
                        <Input type="file" accept="image/*" disabled/>
                        <p className="text-xs text-muted-foreground">Photo upload will be available in the parent dashboard after registration.</p>
                     </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold border-b mb-4 pb-2 font-headline text-primary/90">2. Parent/Guardian Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormField control={form.control} name="parentFirstName" render={({ field }) => ( <FormItem> <FormLabel>First Name</FormLabel> <FormControl> <Input placeholder="Anna" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                       <FormField control={form.control} name="parentLastName" render={({ field }) => ( <FormItem> <FormLabel>Last Name</FormLabel> <FormControl> <Input placeholder="Bloom" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                    </div>
                     <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl> <Input type="email" placeholder="anna.bloom@example.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                     <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl> <Input type="tel" placeholder="123-456-7890" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                     <FormField control={form.control} name="address" render={({ field }) => ( <FormItem> <FormLabel>Physical Address</FormLabel> <FormControl> <Input placeholder="123 Sunny Lane, Anytown, USA" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                     
                    <FormField control={form.control} name="password" render={({ field }) => ( <FormItem> <FormLabel>Password</FormLabel> <FormControl><div className="relative"><Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}><span>{showPassword ? <EyeOff /> : <Eye />}</span></Button></div></FormControl> <FormMessage /> </FormItem> )}/>
                    <FormField control={form.control} name="confirmPassword" render={({ field }) => ( <FormItem> <FormLabel>Confirm Password</FormLabel> <FormControl><div className="relative"><Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowConfirmPassword(!showConfirmPassword)}><span>{showConfirmPassword ? <EyeOff /> : <Eye />}</span></Button></div></FormControl> <FormMessage /> </FormItem> )}/>
                  </div>
                </section>
                
                 <section>
                  <h3 className="text-xl font-semibold border-b mb-4 pb-2 font-headline text-primary/90">3. Emergency Contact</h3>
                   <div className="space-y-4">
                     <FormField control={form.control} name="emergencyName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl> <Input placeholder="John Bloom" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                     <FormField control={form.control} name="emergencyRelation" render={({ field }) => ( <FormItem> <FormLabel>Relationship to Child</FormLabel> <FormControl> <Input placeholder="Father" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
                     <FormField control={form.control} name="emergencyPhone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl> <Input type="tel" placeholder="123-456-7891" {...field} /> </FormControl> <FormMessage /> </FormItem> )}/>
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
