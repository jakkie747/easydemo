import { TeachersClient } from "./client";
import { teachers } from "@/lib/mock-data";

export default function TeachersPage() {
  // In a real app, you would fetch this data from your database.
  const allTeachers = teachers;

  return <TeachersClient teachers={allTeachers} />;
}
