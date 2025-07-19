
import { getParents } from "@/lib/firestore";
import type { Parent } from "@/lib/types";
import { ParentsClient } from "./client";

export const revalidate = 0; // Revalidate this page on every request

export default async function ParentsPage() {
  const allParents: Parent[] = await getParents();

  return <ParentsClient initialParents={allParents} />;
}
