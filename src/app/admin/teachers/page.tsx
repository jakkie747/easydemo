
import { TeachersClient } from "./client";
import { getTeachers } from "@/lib/firestore";
import type { Teacher } from "@/lib/types";

export const revalidate = 0; // Revalidate this page on every request

export default async function TeachersPage() {
  const allTeachers: Teacher[] = await getTeachers();

  return <TeachersClient teachers={allTeachers} />;
}
