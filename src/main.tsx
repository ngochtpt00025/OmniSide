import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SideBar from "./layout/SideBar";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";

const appWindow = getCurrentWebviewWindow();

// 'popup' = floating button (App.tsx)
// 'main' = main window with Sider UI (SideBar.tsx)
if (appWindow.label === 'main') {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <SideBar />
    </React.StrictMode>,
  );
} else {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
