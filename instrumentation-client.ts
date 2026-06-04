import * as Sentry from "@sentry/nextjs";
import { initBotId } from "botid/client/core";

Sentry.init({
  dsn: "https://274971b03bf3a101b556c1cbc658e7af@o4509446862274560.ingest.us.sentry.io/4511507794624512",

  sendDefaultPii: false,

  // Tracing
  tracesSampleRate: 1.0,

  // Browser Profiling
  profileSessionSampleRate: 1.0,
  profileLifecycle: "trace",

  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Logs
  enableLogs: true,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    }),
    Sentry.browserProfilingIntegration(),
    Sentry.feedbackIntegration({
      colorScheme: "system",
    }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

initBotId({
  protect: [
    {
      path: "/api/chat",
      method: "POST",
    },
  ],
});
