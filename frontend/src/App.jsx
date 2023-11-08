import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginComponent from "./components/LoginComponent";
import NavbarComponent from './components/NavbarComponent';
import ErrorPage from "./components/ErrorPageComponent";
import ListadoComponent from './components/ListadoComponent';
import ListadoOfertasComponent from './components/ListadoOfertasComponent';
import CarritoComponent from "./components/CarritoComponent";
import ListadoComprasComponent from "./components/ListadoComprasComponent";
import HomeComponent from "./components/HomeComponent";
import ActividadesComponent from "./components/ActividadesComponents";
import ConfirmarCuent from "./components/ConfirmarCuenta";
import FormularioServiciosComponent from "./components/FormularioServiciosComponent";
import ListadoAdminComponent from './components/ListadoAdminComponent';
const App = () => {
  return (
    <BrowserRouter>
          <Routes>
              <Route path="/" element={<NavbarComponent />}>
                  <Route index element={<HomeComponent />} />
                  <Route path="Servicios" element={<ListadoComponent />} />
                  <Route path="Ofertas" element={<ListadoOfertasComponent />} />
                  <Route path="ShoppingCart" element={<CarritoComponent />} />
                  <Route path="ShoppingList" element={<ListadoComprasComponent />} />
                  <Route path="Actividades" element={<ActividadesComponent />} />
                  <Route path="login" element={<LoginComponent />} />
                  <Route path="confirma/:token" element={<ConfirmarCuent />} />
                  <Route path="registrarServicio" element={<FormularioServiciosComponent />} />
                  <Route path="listadoAdministrador" element={<ListadoAdminComponent />} />
              </Route>
          </Routes>
    </BrowserRouter>
  )};


export default App
