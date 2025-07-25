import { getChildren } from "@/lib/firestore";
import type { Child } from "@/lib/types";
import { ChildrenClient } from "./client";

export default async function ChildrenPage() {
  const children: Child[] = await getChildren();
  return <ChildrenClient initialChildren={children} />;
}
