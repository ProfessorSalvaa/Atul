import "server-only";
import { cache } from "react";
import { validateSession } from "./session";

/** React-cache-memoized per-request current-user lookup. Server
 *  Components (layout, page, nested components) can all call this
 *  freely — only the first call in a given request actually hits the
 *  database, later calls in the same render reuse the result. */
export const getCurrentUser = cache(async () => {
  const { user } = await validateSession();
  return user;
});
