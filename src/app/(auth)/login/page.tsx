
"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

type FormValues = z.infer<typeof formSchema>;

function LoginForm({ userType }: { userType: 'parent' | 'admin' }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      const redirectPath = userType === 'admin' ? '/admin/dashboard' : '/parent/dashboard';
      router.push(redirectPath);
    } catch (error: any) {
      console.error(error);
      let errorMessage = "An unknown error occurred.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password. Please try again.";
      }
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={userType === 'admin' ? 'admin@example.com' : 'm@example.com'} {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </Form>
  )
}


export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Tabs defaultValue="parent" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parent">Parent</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="parent">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Parent Login</CardTitle>
              <CardDescription>
                Access your dashboard to view daily reports and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm userType="parent" />
            </CardContent>
            <CardFooter className="justify-center">
                 <Button variant="link" asChild>
                    <Link href="/"><ArrowLeft/> Back to Home</Link>
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Access the admin dashboard to manage the center.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm userType="admin" />
            </CardContent>
             <CardFooter className="justify-center">
                <Button variant="link" asChild>
                    <Link href="/"><ArrowLeft/> Back to Home</Link>
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
