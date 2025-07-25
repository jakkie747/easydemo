import { getTeachers } from "@/lib/firestore";
import type { Teacher } from "@/lib/types";
import { TeachersClient } from "./client";

export default async function TeachersPage() {
  const teachers: Teacher[] = await getTeachers();
  return <TeachersClient initialTeachers={teachers} />;
}
