
import { getChildren } from "@/lib/firestore";
import type { Child } from "@/lib/types";
import { ChildrenClient } from "./client";

export const revalidate = 0; // Revalidate this page on every request

export default async function ChildrenPage() {
  const allChildren: Child[] = await getChildren();

  return <ChildrenClient initialChildren={allChildren} />;
}
