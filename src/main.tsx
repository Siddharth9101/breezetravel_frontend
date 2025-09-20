import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider.tsx";
import ReactQueryProvider from "@/providers/ReactQueryProvider.tsx";
import CategoryProvider from "@/providers/CategoryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <Provider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </Provider>
    </ReactQueryProvider>
  </StrictMode>
);
