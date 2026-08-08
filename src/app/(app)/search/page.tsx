import type { Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <>
      <PageHeader
        title="Search"
        description="Cmd+K works from anywhere — this is the full-results view."
      />
      <SearchResults />
    </>
  );
}
