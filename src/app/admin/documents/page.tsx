import { DocumentsClient } from "./client";
import { getDocuments } from "@/lib/firestore";
import type { Document } from "@/lib/types";

export default async function DocumentsPage() {
  const documents: Document[] = await getDocuments();
  return <DocumentsClient initialDocuments={documents} />;
}
