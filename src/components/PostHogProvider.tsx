"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

function PostHogPageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;
    const url =
      window.location.origin +
      pathname +
      (searchParams && searchParams.toString() ? `?${searchParams.toString()}` : "");
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (!key) {
      // Skip silently if not configured — keeps preview deploys working.
      return;
    }

    if (!posthog.__loaded) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false, // we handle pageviews manually for SPA navigation
        capture_pageleave: true,
        person_profiles: "identified_only",
      });
    }
    // Expose for use via window.posthog in non-React contexts (analytics.ts)
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).posthog = posthog;
    }
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageviewTracker />
      </Suspense>
      {children}
    </>
  );
}
