import { LoadingState } from "@/components/ui/LoadingState";

/** Root-level loading UI — shown while a route segment's data is being
 *  fetched. Most M2 pages are static, so this mainly matters once real
 *  data fetching (M5+) makes it a common state. */
export default function RootLoading() {
  return (
    <div
      style={{ display: "flex", minHeight: "60vh", alignItems: "center", justifyContent: "center" }}
    >
      <LoadingState label="Loading Curitiq…" />
    </div>
  );
}
