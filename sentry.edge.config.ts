import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://274971b03bf3a101b556c1cbc658e7af@o4509446862274560.ingest.us.sentry.io/4511507794624512",

  sendDefaultPii: true,

  // Tracing
  tracesSampleRate: 1.0,

  // Logs
  enableLogs: true,
});
