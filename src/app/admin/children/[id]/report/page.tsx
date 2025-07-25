
import { ChildReportClient } from "./client";

export default function ChildReportPage({ params }: { params: { id: string } }) {
  return <ChildReportClient childId={params.id} />;
}
