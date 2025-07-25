
import { ParentsClient } from "./client";

export default function ParentsPage() {
  // The initialParents array is empty because data will be fetched on the client.
  return <ParentsClient initialParents={[]} />;
}
