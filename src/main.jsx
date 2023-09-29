// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {Navbar, NextUIProvider} from "@nextui-org/react";
import "./index.css";
import NavbarComponent from "./components/NavbarComponent";


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