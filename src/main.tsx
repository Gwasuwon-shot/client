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
