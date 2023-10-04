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
import ListadoComponent from './components/ListadoComponent';
import ListadoOfertasComponent from './components/ListadoOfertasComponent';
import CarritoComponent from "./components/CarritoComponent";
import ListadoComprasComponent from "./components/ListadoComprasComponent";
import HomeComponent from "./components/HomeComponent";
import ActividadesComponent from "./components/ActividadesComponents";




const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarComponent />,
    children: [
      {
        path: "Inicio",
        element: <HomeComponent />
      },{
        path: "Servicios",
        element: <ListadoComponent />
      },{
        path: "Ofertas",
        element: <ListadoOfertasComponent />
      },{
        path: "login",
        element: <LoginComponent />
      },{
        path: "ShoppingCart",
        element: <CarritoComponent />
        
      },{
        path: "ShoppingList",
        element: <ListadoComprasComponent />
        
      },{
        path: "Actividades",
        element: <ActividadesComponent />
        
      }

    ],
    errorElement: <ErrorPage />,
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className=" text-foreground bg-background">
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