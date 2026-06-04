import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://274971b03bf3a101b556c1cbc658e7af@o4509446862274560.ingest.us.sentry.io/4511507794624512",

  sendDefaultPii: false,

  // Tracing
  tracesSampleRate: 1.0,

  // Logs
  enableLogs: true,

  // AI Agent Monitoring: stream gen_ai spans to the AI Agents dashboard
  streamGenAiSpans: true,

  // Vercel AI SDK instrumentation must be enabled explicitly in the edge runtime.
  integrations: [
    Sentry.vercelAIIntegration({
      recordInputs: true,
      recordOutputs: true,
    }),
  ],
});
