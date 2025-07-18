
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, BookOpen, Bell, ArrowUpRight } from "lucide-react"

const chartData = [
  { month: "January", students: 186 },
  { month: "February", students: 205 },
  { month: "March", students: 237 },
  { month: "April", students: 173 },
  { month: "May", students: 209 },
  { month: "June", students: 214 },
]

const chartConfig = {
  students: {
    label: "Students",
    color: "hsl(var(--primary))",
  },
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's a look at what's happening.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Preschool & Afterschool</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Spring Fling next week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">in the last 7 days</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>New Student Enrollment</CardTitle>
            <CardDescription>A look at student enrollment over the past 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="students" fill="var(--color-students)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>
              The latest students to join our programs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Program</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/40?u=olivia" />
                        <AvatarFallback>OM</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">Olivia Martin</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Preschool</Badge>
                  </TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>
                     <div className="flex items-center gap-2">
                       <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/40?u=liam" />
                        <AvatarFallback>LN</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">Liam Neeson</div>
                     </div>
                  </TableCell>
                  <TableCell>
                    <Badge>Afterschool</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                     <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/40?u=emma" />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">Emma Watson</div>
                     </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Preschool</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
