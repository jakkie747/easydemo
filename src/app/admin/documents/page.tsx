
import { getDocuments } from "@/lib/firestore";
import type { Document } from "@/lib/types";
import { DocumentsClient } from "./client";

export const revalidate = 0; // Revalidate this page on every request

export default async function DocumentsPage() {
  const allDocuments: Document[] = await getDocuments();

  return <DocumentsClient documents={allDocuments} />;
}
