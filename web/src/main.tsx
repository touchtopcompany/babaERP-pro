import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./theme/ThemeProvider.tsx";
import { ThemeWraper } from "./theme/ThemeWrapper.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryCLient.ts";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ThemeWraper>
        <App />
      </ThemeWraper>
    </ThemeProvider>
  </QueryClientProvider>
);
