
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export default function TeacherDashboard() {
  return (
    <div className="flex flex-col gap-8 p-4 lg:gap-6 lg:p-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, your system is almost ready.</p>
      </div>
      
       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><GraduationCap /> Coming Soon</CardTitle>
            <CardDescription>This teacher dashboard is currently under development.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Soon, you'll be able to see your class roster, submit daily reports for your students, and access important resources.</p>
        </CardContent>
      </Card>

    </div>
  )
}
