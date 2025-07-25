import { getParents } from "@/lib/firestore";
import type { Parent } from "@/lib/types";
import { ParentsClient } from "./client";

export default async function ParentsPage() {
  const parents: Parent[] = await getParents();
  return <ParentsClient initialParents={parents} />;
}
