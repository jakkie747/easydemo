import { EventsClient } from "./client";
import { getEvents } from "@/lib/firestore";
import type { Event } from "@/lib/types";

export default async function EventsPage() {
  const events: Event[] = await getEvents();
  return <EventsClient initialEvents={events} />;
}
