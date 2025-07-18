import { TeachersClient } from "./client";
import { getTeachers } from "@/lib/firestore";
import type { Teacher } from "@/lib/types";

export default async function TeachersPage() {
  const allTeachers: Teacher[] = await getTeachers();

  return <TeachersClient teachers={allTeachers} />;
}
