
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useState } from "react";

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
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type Role = "parent" | "teacher" | "admin";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues, role: Role) => {
    setIsLoading(true);
    try {
      // Handle special admin/teacher logins first
      if (role === 'admin' && values.email === "admin@easyspark.com" && values.password === "password123") {
         toast({
          title: "Admin Login Successful!",
          description: "Redirecting to the admin dashboard.",
        });
        router.push("/admin/dashboard");
        return; // Important: exit after successful login
      } 
      
      if (role === 'teacher' && values.email === "teacher@easyspark.com" && values.password === "password123") {
        toast({
          title: "Teacher Login Successful!",
          description: "Redirecting to the teacher dashboard.",
        });
        // TODO: Redirect to teacher dashboard when it's created
        router.push("/admin/dashboard"); // Placeholder redirect
        return; // Important: exit after successful login
      } 
      
      // Handle parent login for all other cases
      if (role === 'parent') {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: "Login Successful!",
          description: "Welcome back! Redirecting to your dashboard.",
        });
        router.push("/parent/dashboard");
      } else {
        // This case will now only be hit if it's a non-parent role with wrong credentials
         toast({
            variant: "destructive",
            title: "Login Failed",
            description: "Invalid credentials for this role.",
        });
      }

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const LoginForm = ({ role }: { role: Role }) => (
     <Form {...form}>
        <form onSubmit={form.handleSubmit(values => onSubmit(values, role))} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
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
                    <div className="relative">
                        <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                        </Button>
                    </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        </form>
      </Form>
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Welcome Back!</CardTitle>
          <CardDescription>Select your role and sign in to continue.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="parent" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="parent">Parent</TabsTrigger>
                    <TabsTrigger value="teacher">Teacher</TabsTrigger>
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
                <TabsContent value="parent" className="pt-4">
                    <LoginForm role="parent" />
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/register/preschool" className="underline">
                        Register here
                        </Link>
                    </div>
                </TabsContent>
                 <TabsContent value="teacher" className="pt-4">
                    <LoginForm role="teacher" />
                     <div className="mt-4 text-center text-sm text-muted-foreground">
                        Use teacher@easyspark.com / password123
                    </div>
                </TabsContent>
                 <TabsContent value="admin" className="pt-4">
                    <LoginForm role="admin" />
                     <div className="mt-4 text-center text-sm text-muted-foreground">
                        Use admin@easyspark.com / password123
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
        <CardFooter className="justify-center">
            <Button variant="link" asChild>
                <Link href="/"><ArrowLeft/> Back to Home</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
