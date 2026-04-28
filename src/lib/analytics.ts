// Lightweight wrapper around posthog-js for tracking events from any client component.
// Safe to call before posthog has initialized — calls are no-ops in that case.

// Minimal shape we use; avoids leaking the full PostHog type into client surface.
type PostHogLike = {
  capture: (name: string, properties?: Record<string, unknown>) => void;
  identify: (distinctId: string, properties?: Record<string, unknown>) => void;
  reset: () => void;
};

declare global {
  interface Window {
    posthog?: PostHogLike;
  }
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.posthog?.capture(name, properties);
  } catch (err) {
    // Never let analytics break the app
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] capture failed", err);
    }
  }
}

export function identifyUser(distinctId: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.posthog?.identify(distinctId, properties);
  } catch {
    /* ignore */
  }
}

export function resetUser() {
  if (typeof window === "undefined") return;
  try {
    window.posthog?.reset();
  } catch {
    /* ignore */
  }
}
