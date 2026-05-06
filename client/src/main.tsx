import "./index.css";
import router from "./routes.tsx";

import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TooltipProvider>
    </Provider>
  </StrictMode>,
);
