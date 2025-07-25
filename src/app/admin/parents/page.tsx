import { ParentsClient } from "./client";
import { getParents } from "@/lib/firestore";
import type { Parent } from "@/lib/types";

export default async function ParentsPage() {
  const parents: Parent[] = await getParents();
  return <ParentsClient initialParents={parents} />;
}
