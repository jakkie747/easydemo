
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BookOpen, GraduationCap } from "lucide-react"

export default function TeacherDashboard() {
  return (
    <div className="flex flex-col gap-8 p-4 lg:gap-6 lg:p-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's a look at your day.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Class</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bumblebees</div>
            <p className="text-xs text-muted-foreground">Preschool Program</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Today</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">All present</p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This teacher dashboard is currently under development.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Here, you'll be able to see your class roster, submit daily reports, and access resources.</p>
        </CardContent>
      </Card>

    </div>
  )
}
