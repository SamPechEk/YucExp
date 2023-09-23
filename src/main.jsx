// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from "@nextui-org/react";
import App from "./App";
import "./index.css";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from './components/NavbarComponent';
import BuscadorComponent from "./components/BuscadorComponent";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
        <NavbarComponent />
        <BuscadorComponent/>
        <LoginComponent />
        <div>
        </div>
      </main>
    </NextUIProvider>
  </React.StrictMode>,
);