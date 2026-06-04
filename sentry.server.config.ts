import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://274971b03bf3a101b556c1cbc658e7af@o4509446862274560.ingest.us.sentry.io/4511507794624512",

  sendDefaultPii: true,

  // Tracing
  tracesSampleRate: 1.0,

  // Node.js Profiling
  profileSessionSampleRate: 1.0,
  profileLifecycle: "trace",

  // Logs
  _experiments: { enableLogs: true },

  integrations: [
    nodeProfilingIntegration(),
  ],
});
