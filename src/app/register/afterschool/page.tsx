import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function AfterschoolRegistrationPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
       <div className="container mx-auto">
        <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
        </div>
        <Card className="max-w-3xl mx-auto flex flex-col items-center justify-center h-96 border-dashed">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Afterschool Registration</CardTitle>
            <CardDescription>This page is coming soon!</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
