
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Role = "parent" | "teacher" | "admin";

const LoginForm = ({ role, onLogin, isLoading }: { role: Role; onLogin: (email: string, password: string) => void; isLoading: boolean; }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(role === 'admin' ? "admin@easyspark.com" : role === 'teacher' ? "teacher@easyspark.com" : "");
    const [password, setPassword] = useState(role === 'admin' || role === 'teacher' ? "password123" : "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor={`email-${role}`}>Email</Label>
                <Input id={`email-${role}`} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`password-${role}`}>Password</Label>
                <div className="relative">
                    <Input id={`password-${role}`} type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
        </form>
    );
};


export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string, role: Role) => {
    setIsLoading(true);
    try {
      if (role === 'admin') {
          if (email === "admin@easyspark.com" && password === "password123") {
              toast({
                  title: "Admin Login Successful!",
                  description: "Redirecting to the admin dashboard.",
                });
                router.push("/admin/dashboard");
            } else {
                toast({ variant: "destructive", title: "Login Failed", description: "Invalid credentials for this role." });
            }
        return;
      }
      
      if (role === 'teacher') {
          if (email === "teacher@easyspark.com" && password === "password123") {
              toast({
                title: "Teacher Login Successful!",
                description: "Redirecting to the teacher dashboard.",
            });
            router.push("/teacher/dashboard");
        } else {
            toast({ variant: "destructive", title: "Login Failed", description: "Invalid credentials for this role." });
        }
        return;
      }
      
      if (role === 'parent') {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Login Successful!",
          description: "Welcome back! Redirecting to your dashboard.",
        });
        router.push("/parent/dashboard");
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
                    <LoginForm role="parent" onLogin={(email, password) => handleLogin(email, password, 'parent')} isLoading={isLoading} />
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/register/preschool" className="underline">
                        Register here
                        </Link>
                    </div>
                </TabsContent>
                 <TabsContent value="teacher" className="pt-4">
                    <LoginForm role="teacher" onLogin={(email, password) => handleLogin(email, password, 'teacher')} isLoading={isLoading} />
                     <div className="mt-4 text-center text-sm text-muted-foreground">
                        Use teacher@easyspark.com / password123
                    </div>
                </TabsContent>
                 <TabsContent value="admin" className="pt-4">
                    <LoginForm role="admin" onLogin={(email, password) => handleLogin(email, password, 'admin')} isLoading={isLoading} />
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
