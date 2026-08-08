import type { ReactNode } from "react";
import { Footer } from "@/components/navigation/Footer";
import { PUBLIC_FOOTER_COLUMNS } from "@/lib/navigation/nav-config";
import { getCurrentUser } from "@/lib/auth/current-user";
import { PageTransition } from "./PageTransition";
import { PublicHeader } from "./PublicHeader";
import styles from "./PublicShell.module.css";

/** Shared chrome for Home, Marketing, and Blog layouts — public header +
 *  footer. Each of those three layouts still gets its own layout.tsx file
 *  (per M2's deliverable list) so their content containers can diverge
 *  later without touching the others; today they all just wrap this.
 *
 *  Checks the real session (M3) so a signed-in visitor browsing public
 *  pages sees "Dashboard" instead of Login/Signup — see PublicHeader. */
export async function PublicShell({
  children,
  narrow,
}: {
  children: ReactNode;
  /** Blog uses a narrower reading column for the Newsreader long-form type. */
  narrow?: boolean;
}) {
  const user = await getCurrentUser();

  return (
    <div className={styles.page}>
      <PublicHeader signedIn={Boolean(user)} />
      <main id="main-content" tabIndex={-1} className={narrow ? styles.mainNarrow : styles.main}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer columns={PUBLIC_FOOTER_COLUMNS} />
    </div>
  );
}
