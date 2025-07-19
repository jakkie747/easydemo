
import { getEvents } from "@/lib/firestore";
import type { Event } from "@/lib/types";
import { EventsClient } from "./client";

export const revalidate = 0; // Revalidate this page on every request

export default async function EventsPage() {
  const allEvents: Event[] = await getEvents();

  return <EventsClient initialEvents={allEvents} />;
}
