
import { TeachersClient } from "./client";

export default function TeachersPage() {
  // The initialTeachers array is empty because data will be fetched on the client.
  return <TeachersClient teachers={[]} />;
}
