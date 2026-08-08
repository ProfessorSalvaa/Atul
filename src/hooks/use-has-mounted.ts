"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after client-side hydration — for components that need to
 * avoid a server/client mismatch (e.g. reading next-themes' resolved
 * theme, which isn't known until the client reads localStorage/media
 * query). Built on useSyncExternalStore instead of useState+useEffect for
 * the same reason as useMediaQuery — see that file's comment.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
