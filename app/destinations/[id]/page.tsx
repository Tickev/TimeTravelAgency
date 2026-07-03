import { notFound } from "next/navigation";
import { destinations, getDestination } from "@/lib/destinations";
import DestinationPageClient from "./DestinationPageClient";

// Generate static params for all destinations
export function generateStaticParams() {
  return destinations.map((d) => ({ id: d.id }));
}

// Dynamic metadata params is a Promise in Next.js 15+
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = getDestination(id);
  if (!destination) return { title: "Destination introuvable" };

  return {
    title: `${destination.title} | TimeTravel Agency`,
    description: destination.description,
  };
}

// Page component params must be awaited in Next.js 15+
export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = getDestination(id);

  if (!destination) {
    notFound();
  }

  return <DestinationPageClient destination={destination} />;
}
