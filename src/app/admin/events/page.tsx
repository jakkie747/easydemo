
import { EventsClient } from "./client";

export default function EventsPage() {
  // The initialEvents array is empty because data will be fetched on the client.
  return <EventsClient events={[]} />;
}
