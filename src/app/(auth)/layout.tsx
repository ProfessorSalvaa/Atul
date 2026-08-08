import type { ReactNode } from "react";
import { AuthChrome } from "@/components/shell/AuthChrome";

/** Auth Layout — login, signup, forgot/reset password, and onboarding
 *  (see AuthChrome.tsx for why onboarding lives here). */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthChrome>{children}</AuthChrome>;
}
