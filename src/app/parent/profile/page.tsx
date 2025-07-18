
"use client"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth.tsx";
import { useEffect, useState } from "react";
import type { Parent, Child } from "@/lib/types";
import { getParent, updateParent, updateChild } from "@/lib/firestore";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, User, Shield, KeyRound, Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton";

// Schemas
const childInfoSchema = z.object({
    name: z.string().min(2, "Name is required."),
    dob: z.string().min(1, "Date of birth is required."),
    allergies: z.string().optional(),
});
const parentInfoSchema = z.object({
    name: z.string().min(2, "Name is required."),
    phone: z.string().min(1, "Phone number is required."),
});
const emergencyContactSchema = z.object({
    name: z.string().min(2, "Name is required."),
    relation: z.string().min(1, "Relationship is required."),
    phone: z.string().min(1, "Phone number is required."),
});
const accountSchema = z.object({
    currentPassword: z.string().min(6, "Current password is required."),
    newPassword: z.string().min(6, "New password must be at least 6 characters."),
}).refine(data => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current one.",
    path: ["newPassword"],
});


export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const auth = getAuth(app);
  const [parentData, setParentData] = useState<Parent | null>(null);
  const [childData, setChildData] = useState<Child | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Forms
  const childForm = useForm<z.infer<typeof childInfoSchema>>({ resolver: zodResolver(childInfoSchema) });
  const parentForm = useForm<z.infer<typeof parentInfoSchema>>({ resolver: zodResolver(parentInfoSchema) });
  const emergencyForm = useForm<z.infer<typeof emergencyContactSchema>>({ resolver: zodResolver(emergencyContactSchema) });
  const accountForm = useForm<z.infer<typeof accountSchema>>({ resolver: zodResolver(accountSchema) });

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setDataLoading(true);
        try {
            const parent = await getParent(user.uid);
            setParentData(parent);
            if (parent && parent.childDetails && parent.childDetails.length > 0) {
                const mainChild = parent.childDetails[0];
                setChildData(mainChild);
                // Initialize forms
                childForm.reset({ name: mainChild.name, dob: mainChild.dob, allergies: mainChild.allergies });
                parentForm.reset({ name: parent.name, phone: parent.phone });
                if (mainChild.emergencyContact) {
                    emergencyForm.reset(mainChild.emergencyContact);
                }
            }
        } catch(e) {
            console.error(e)
        } finally {
            setDataLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  const onChildSubmit = async (values: z.infer<typeof childInfoSchema>) => {
    if (!childData) return;
    try {
        await updateChild(childData.id, { ...childData, name: values.name, dob: values.dob, allergies: values.allergies });
        toast({ title: "Child Info Updated", description: "Your child's information has been saved." });
    } catch (error) {
        toast({ variant: 'destructive', title: "Update Failed", description: "Could not save changes." });
    }
  };

  const onParentSubmit = async (values: z.infer<typeof parentInfoSchema>) => {
    if (!parentData) return;
     try {
        await updateParent(parentData.id, { ...parentData, name: values.name, phone: values.phone });
        toast({ title: "Your Info Updated", description: "Your information has been saved." });
    } catch (error) {
        toast({ variant: 'destructive', title: "Update Failed", description: "Could not save changes." });
    }
  };
  
  const onEmergencySubmit = async (values: z.infer<typeof emergencyContactSchema>) => {
      if (!childData) return;
      try {
        await updateChild(childData.id, { ...childData, emergencyContact: values });
        toast({ title: "Emergency Contact Updated", description: "The emergency contact has been saved." });
    } catch (error) {
        toast({ variant: 'destructive', title: "Update Failed", description: "Could not save changes." });
    }
  };

  const onAccountSubmit = async (values: z.infer<typeof accountSchema>) => {
      if (!user || !user.email) return;
      
      const credential = EmailAuthProvider.credential(user.email, values.currentPassword);
      try {
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, values.newPassword);
          toast({ title: "Password Updated", description: "Your password has been changed successfully." });
          accountForm.reset({currentPassword: '', newPassword: ''});
      } catch (error: any) {
          let desc = "An error occurred.";
          if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
              desc = "The current password you entered is incorrect.";
          }
          toast({ variant: 'destructive', title: "Update Failed", description: desc });
      }
  };

  if (authLoading || dataLoading) {
      return (
        <div className="container mx-auto px-4 md:px-8 py-8">
            <div className="max-w-3xl mx-auto space-y-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
      )
  }

  return (
    <div className="bg-muted/40 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
              <Link href="/parent/dashboard">
                  <ArrowLeft />
                  Back to Dashboard
              </Link>
          </Button>
        </div>
        <main className="flex justify-center">
          <Tabs defaultValue="child-info" className="w-full max-w-3xl">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="child-info">Child's Info</TabsTrigger>
              <TabsTrigger value="parent-info">My Info</TabsTrigger>
              <TabsTrigger value="contacts">Emergency</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="child-info">
              <Card>
                <Form {...childForm}>
                <form onSubmit={childForm.handleSubmit(onChildSubmit)}>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><User/>Child's Information</CardTitle>
                  <CardDescription>
                    Manage your child's profile details. This information helps us provide the best care.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={childForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={childForm.control} name="dob" render={({ field }) => (
                        <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={childForm.control} name="allergies" render={({ field }) => (
                        <FormItem><FormLabel>Allergies & Medical Notes</FormLabel><FormControl><Textarea placeholder="e.g., Peanuts, lactose intolerant" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <div className="flex justify-end">
                      <Button type="submit" disabled={childForm.formState.isSubmitting}>
                        {childForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                      </Button>
                  </div>
                </CardContent>
                </form>
                </Form>
              </Card>
            </TabsContent>

            <TabsContent value="parent-info">
              <Card>
                <Form {...parentForm}>
                <form onSubmit={parentForm.handleSubmit(onParentSubmit)}>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><User/>Parent/Guardian Information</CardTitle>
                  <CardDescription>
                    Update your contact information here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormField control={parentForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={parentData?.email} disabled />
                    <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                  </div>
                  <FormField control={parentForm.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <div className="flex justify-end">
                      <Button type="submit" disabled={parentForm.formState.isSubmitting}>
                        {parentForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                      </Button>
                  </div>
                </CardContent>
                </form>
                </Form>
              </Card>
            </TabsContent>
            
            <TabsContent value="contacts">
              <Card>
                 <Form {...emergencyForm}>
                <form onSubmit={emergencyForm.handleSubmit(onEmergencySubmit)}>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><Shield/>Emergency Contacts</CardTitle>
                  <CardDescription>
                    Manage your emergency contacts. Please provide at least one.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 border p-4 rounded-lg relative">
                      <h3 className="font-semibold">Contact 1</h3>
                      <FormField control={emergencyForm.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={emergencyForm.control} name="relation" render={({ field }) => (
                            <FormItem><FormLabel>Relationship</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={emergencyForm.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                  </div>
                  <div className="flex justify-end">
                      <Button type="submit" disabled={emergencyForm.formState.isSubmitting}>
                        {emergencyForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                      </Button>
                  </div>
                </CardContent>
                </form>
                </Form>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)}>
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-2"><KeyRound/>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <FormField control={accountForm.control} name="currentPassword" render={({ field }) => (
                        <FormItem><FormLabel>Current Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={accountForm.control} name="newPassword" render={({ field }) => (
                        <FormItem><FormLabel>New Password</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <div className="flex justify-end">
                      <Button type="submit" disabled={accountForm.formState.isSubmitting}>
                        {accountForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Password
                      </Button>
                  </div>
                </CardContent>
                </form>
                </Form>
              </Card>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  )
}
