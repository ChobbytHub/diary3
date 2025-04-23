// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AuthProvider from "./contexts/AuthProvider";
import store from "./redux/store";
import DiaryProvider from "./contexts/DiaryProvider";
import "./index.css";

const rootElement = document.getElementById("root");
createRoot(rootElement!).render(
  <StrictMode>
    <BrowserRouter basename="/diary3">
      <Provider store={store}>
        <AuthProvider>
          <DiaryProvider>
            <App />
          </DiaryProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
