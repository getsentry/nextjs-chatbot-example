"use client";

import * as Sentry from "@sentry/nextjs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * Associates client-side (browser) Sentry events — errors, replays, spans —
 * with the authenticated user. Renders nothing; mount once inside
 * SessionProvider.
 */
export function SentryUser() {
  const { data: session } = useSession();
  const id = session?.user?.id;
  const type = session?.user?.type;
  const email = session?.user?.email ?? undefined;

  useEffect(() => {
    // ip_address: "{{auto}}" is meaningful only client-side — Sentry's ingestion
    // infers it from the browser's own connection (the real end-user IP). Kept
    // here so we retain user IPs even with sendDefaultPii disabled.
    Sentry.setUser(id ? { id, type, email, ip_address: "{{auto}}" } : null);
  }, [id, type, email]);

  return null;
}
