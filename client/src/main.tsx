import "./index.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, lazy } from "react";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();

const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find root element");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<div>Loading page...</div>}>
            <App />
          </Suspense>
          <Toaster />
        </QueryClientProvider>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
