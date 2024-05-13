import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
      retry: 0,
    },
  },
});

Sentry.init({
  dsn: process.env.NODE_ENV === "production" ? import.meta.env.VITE_APP_SENTRY_DSN : false,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  
  // tracePropagationTargets: ["localhost", /^https:\/\/tutice\.o-r\.kr/],
  tracePropagationTargets: ["localhost", /^https:\/\/tutice\.o-r\.kr\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want t change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </CookiesProvider>,
);
