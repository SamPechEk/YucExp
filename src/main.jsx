// main.tsx or main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from "@nextui-org/react";
import {
  createBrowserRouter,
  RouterProvider, 
} from "react-router-dom";
import App from "./App";
import "./index.css";
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from './components/NavbarComponent';
import ErrorPage from "./components/ErrorPageComponent";



const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarComponent />,
    children: [
      {
        path: "login",
        element: <LoginComponent />
      }
    ],
    errorElement: <ErrorPage />,
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <NextUIProvider>
//       <main className="dark text-foreground bg-background">
//         <App />
//         <NavbarComponent />
//         <LoginComponent />
//       </main>
//     </NextUIProvider>
//   </React.StrictMode>,
// );