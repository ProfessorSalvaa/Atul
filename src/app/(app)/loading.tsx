import { Skeleton } from "@/components/ui/Skeleton";

/** Dashboard-shaped skeleton — demonstrates the pattern P0 §15 calls for
 *  ("Skeleton screens for dashboard, course, and lesson pages — never a
 *  bare spinner on primary content") for the one shell where content is
 *  fetched behind a persistent sidebar/topnav that shouldn't itself
 *  flash/reload. */
export default function AppLoading() {
  return (
    <div>
      <Skeleton width={220} height={28} style={{ marginBottom: 8 }} />
      <Skeleton width={320} height={16} style={{ marginBottom: 24 }} />
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        <Skeleton height={140} />
        <Skeleton height={140} />
        <Skeleton height={140} />
      </div>
    </div>
  );
}
