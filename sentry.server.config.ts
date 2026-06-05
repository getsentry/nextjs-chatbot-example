import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://274971b03bf3a101b556c1cbc658e7af@o4509446862274560.ingest.us.sentry.io/4511507794624512",

  sendDefaultPii: false,

  // Tracing
  tracesSampleRate: 1.0,

  // Node.js Profiling
  profileSessionSampleRate: 1.0,
  profileLifecycle: "trace",

  // Logs
  enableLogs: true,

  // AI Agent Monitoring: stream gen_ai spans to the AI Agents dashboard
  streamGenAiSpans: true,

  integrations: [
    nodeProfilingIntegration(),
    // Captures Vercel AI SDK calls (generateText/streamText) as gen_ai spans.
    // force: true is required in the Next.js production build: `ai` is bundled
    // (intentionally not in serverExternalPackages), so OTel can't patch it and
    // module auto-detection fails — without force, the ai.* -> gen_ai.* event
    // processor never attaches and prod only shows raw ai.* spans. See
    // getsentry/sentry-javascript#19147.
    Sentry.vercelAIIntegration({
      force: true,
      recordInputs: true,
      recordOutputs: true,
    }),
  ],
});
