import { client } from "@/lib/sanity/client";
import { eventsListQuery } from "@/lib/sanity/queries";
import EventsClientList from "./EventsClientList";

export const metadata = {
  title: "Eventos — Pastor Alemán",
  description:
    "Calendario de exposiciones, competiciones, seminarios y encuentros del mundo del Pastor Alemán.",
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await client.fetch(eventsListQuery, {}, { next: { revalidate: 60 } });
  return <EventsClientList events={events || []} />;
}
