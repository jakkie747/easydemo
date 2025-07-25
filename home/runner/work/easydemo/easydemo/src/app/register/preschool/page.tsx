
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addParent, addChild } from "@/lib/firestore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Note: Re-implementing with useState to avoid react-hook-form issues during build.
export default function PreschoolRegistrationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);
  
  // Form state
  const [childFirstName, setChildFirstName] = useState('');
  const [childLastName, setChildLastName] = useState('');
  const [childDob, setChildDob] = useState('');
  const [childGender, setChildGender] = useState('');
  const [allergies, setAllergies] = useState('');
  const [previousExperience, setPreviousExperience] = useState('no');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!childFirstName) newErrors.childFirstName = "Child's first name is required.";
    if (!childLastName) newErrors.childLastName = "Child's last name is required.";
    if (!childDob) newErrors.childDob = "Child's date of birth is required.";
    if (!childGender) newErrors.childGender = "Gender is required.";
    if (!parentFirstName) newErrors.parentFirstName = "Your first name is required.";
    if (!parentLastName) newErrors.parentLastName = "Your last name is required.";
    if (!email) newErrors.email = "Please enter a valid email address.";
    if (!phone) newErrors.phone = "Your phone number is required.";
    if (!address) newErrors.address = "Your address is required.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!emergencyName) newErrors.emergencyName = "Emergency contact name is required.";
    if (!emergencyRelation) newErrors.emergencyRelation = "Relationship to child is required.";
    if (!emergencyPhone) newErrors.emergencyPhone = "Emergency contact phone is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please fill out all required fields correctly.",
        });
        return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const childName = `${childFirstName} ${childLastName}`;
      const parentName = `${parentFirstName} ${parentLastName}`;

      await addParent({
          id: user.uid,
          name: parentName,
          email: email,
          phone: phone,
          address: address,
          avatar: `https://placehold.co/150x150.png`,
          children: [childName],
      });
      
      await addChild({
          name: childName,
          dob: childDob,
          gender: childGender,
          parent: parentName,
          parentId: user.uid,
          allergies: allergies,
          previousExperience: previousExperience === 'yes',
          additionalNotes: additionalNotes,
          emergencyContact: {
              name: emergencyName,
              relation: emergencyRelation,
              phone: emergencyPhone,
          },
          avatar: `https://placehold.co/150x150.png`,
          classroom: 'Bumblebees', // default classroom for now
          age: new Date().getFullYear() - new Date(childDob).getFullYear(),
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

  const renderError = (fieldName: string) => errors[fieldName] ? <p className="text-sm font-medium text-destructive">{errors[fieldName]}</p> : null;

  return (
    <div className="py-12 px-4 bg-background">
      <div className="container mx-auto">
        <Card className="max-w-3xl mx-auto shadow-lg border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Preschool Registration</CardTitle>
            <CardDescription>Complete the form below to enroll your child in our preschool program.</CardDescription>
          </CardHeader>
          <CardContent>
              <form onSubmit={onSubmit} className="space-y-8">
                <section>
                  <h3 className="text-xl font-semibold border-b mb-4 pb-2 font-headline text-primary/90">1. Child's Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2"><FormLabel>First Name</FormLabel><Input placeholder="Leo" value={childFirstName} onChange={e => setChildFirstName(e.target.value)} disabled={isLoading} />{renderError("childFirstName")}</div>
                        <div className="space-y-2"><FormLabel>Last Name</FormLabel><Input placeholder="Bloom" value={childLastName} onChange={e => setChildLastName(e.target.value)} disabled={isLoading} />{renderError("childLastName")}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2"><FormLabel>Date of Birth</FormLabel><Input type="date" value={childDob} onChange={e => setChildDob(e.target.value)} disabled={isLoading} />{renderError("childDob")}</div>
                       <div className="space-y-2"><FormLabel>Gender</FormLabel><Input placeholder="e.g. Male, Female, Non-binary" value={childGender} onChange={e => setChildGender(e.target.value)} disabled={isLoading} />{renderError("childGender")}</div>
                    </div>
                    <div className="space-y-2"><FormLabel>Allergies & Medical Notes (optional)</FormLabel><Textarea placeholder="List any allergies or important medical information." value={allergies} onChange={e => setAllergies(e.target.value)} disabled={isLoading} /></div>
                    <div className="space-y-3"><FormLabel>Previous preschool experience?</FormLabel><RadioGroup onValueChange={setPreviousExperience} defaultValue={previousExperience} className="flex items-center space-x-4"><FormItem className="flex items-center space-x-2 space-y-0"><RadioGroupItem value="yes" /><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2 space-y-0"><RadioGroupItem value="no" /><FormLabel className="font-normal">No</FormLabel></FormItem></RadioGroup></div>
                    <div className="space-y-2"><FormLabel>Additional Notes (optional)</FormLabel><Textarea placeholder="Anything else we should know?" value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)} disabled={isLoading} /></div>
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
                        <div className="space-y-2"><FormLabel>First Name</FormLabel><Input placeholder="Anna" value={parentFirstName} onChange={e => setParentFirstName(e.target.value)} disabled={isLoading} />{renderError("parentFirstName")}</div>
                        <div className="space-y-2"><FormLabel>Last Name</FormLabel><Input placeholder="Bloom" value={parentLastName} onChange={e => setParentLastName(e.target.value)} disabled={isLoading} />{renderError("parentLastName")}</div>
                    </div>
                    <div className="space-y-2"><FormLabel>Email Address</FormLabel><Input type="email" placeholder="anna.bloom@example.com" value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />{renderError("email")}</div>
                    <div className="space-y-2"><FormLabel>Phone Number</FormLabel><Input type="tel" placeholder="123-456-7890" value={phone} onChange={e => setPhone(e.target.value)} disabled={isLoading} />{renderError("phone")}</div>
                    <div className="space-y-2"><FormLabel>Physical Address</FormLabel><Input placeholder="123 Sunny Lane, Anytown, USA" value={address} onChange={e => setAddress(e.target.value)} disabled={isLoading} />{renderError("address")}</div>
                     
                    <div className="space-y-2"><FormLabel>Password</FormLabel><div className="relative"><Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button></div>{renderError("password")}</div>
                    <div className="space-y-2"><FormLabel>Confirm Password</FormLabel><div className="relative"><Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={isLoading} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button></div>{renderError("confirmPassword")}</div>
                  </div>
                </section>
                
                 <section>
                  <h3 className="text-xl font-semibold border-b mb-4 pb-2 font-headline text-primary/90">3. Emergency Contact</h3>
                   <div className="space-y-4">
                    <div className="space-y-2"><FormLabel>Full Name</FormLabel><Input placeholder="John Bloom" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} disabled={isLoading} />{renderError("emergencyName")}</div>
                    <div className="space-y-2"><FormLabel>Relationship to Child</FormLabel><Input placeholder="Father" value={emergencyRelation} onChange={e => setEmergencyRelation(e.target.value)} disabled={isLoading} />{renderError("emergencyRelation")}</div>
                    <div className="space-y-2"><FormLabel>Phone Number</FormLabel><Input type="tel" placeholder="123-456-7891" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} disabled={isLoading} />{renderError("emergencyPhone")}</div>
                  </div>
                </section>

                <div className="flex justify-end">
                    <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                       {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                       Submit Registration
                    </Button>
                </div>
              </form>
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

