// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from "@nextui-org/react";
import App from "./App";
import "./index.css";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from './components/NavbarComponent';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <NavbarComponent />
        <App />
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);