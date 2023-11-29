import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, navbar } from "@nextui-org/react";
import AcmeLogoComponent from "./Icons/AcmeLogoComponent";
import SearchIconComponent from "./Icons/SearchIconComponent";
import { Outlet, Link } from "react-router-dom";
import CartIconComponent from "./Icons/CartIconComponent";
import SwitchDarkModeComponent from './SwitchDarkModeComponent';
import Footer from "./Footer";
import SelectComponent from "./SelectComponent";
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { dark, uber, white } from "../assets";





const NavbarComponent = () => {
  const token = localStorage.getItem('token');
  const usuarioLogueado = token !== null;
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Comprobar el tema actual al cargar la página
    let initialTheme = 'light';
    // const htmlElement = document.querySelector('html');
    if (document.querySelector('html').classList.contains('dark')) {
      initialTheme = 'dark';
    }
    
    setTheme(initialTheme);
  }, []); // El array vacío asegura que se ejecute solo una vez al cargar la página

  

  const [nombre, setNombre] = useState("null");
  const [email, setEmail] = useState("null");
  const [tipo, setTipo] = useState("null");

  //solicita info del usuario
  useEffect(() => {
    if (token) {
      
    
    axios.get(`http://localhost:7000/api/usuarios/user/${token}`)
      .then((response) => {

        setNombre(response.data.user.nombre);
        setEmail(response.data.user.email);
        setTipo(response.data.user.idTipoUsuario);
      })
      .catch((error) => {
        console.error('Error al obtener la información del usuario:', error);
        // Maneja los errores aquí, por ejemplo, mostrando un mensaje al usuario.
      });
    }
  }, []);

  const handleLogOut = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    Swal.fire('Sesión cerrada correctamente', '', 'success')
    setTimeout(function () {
      window.location.replace('/login');
    }, 3000);
    // Redirigir al usuario a la página de inicio de sesión u otra página, si es necesario
    // window.location.replace('/login'); // Ejemplo de redirección
  };
  const toggleTheme = () => {
    console.log('themeeeeee');
    let newTheme = 'light';
    // const htmlElement = document.querySelector('html');
    if (document.querySelector('html').classList.contains('dark')) {
      newTheme = 'dark';
    }
    
    
    setTheme(newTheme);
  };
  return (
    <>
      <Navbar isBordered onClick={() => toggleTheme()}>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-2">
          
            {theme == "dark" ? (
                <img width={200} src={white} />
              ) : (

                <img width={200} src={dark} />
                  
              )}
            
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-6">
            <NavbarItem>
              <Link to={`/`}>
                Inicio
              </Link>
            </NavbarItem>
           
        <NavbarItem >
              <Link to={`Ofertas`}>
                Servicios
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to={`Paquetes`}>
                Paquetes
              </Link>
            </NavbarItem>
            {usuarioLogueado && tipo == 2  &&(
            <NavbarItem>
              <Link to={`Dash`}>
                Estadisticas
              </Link>
            </NavbarItem>
            )}



          </NavbarContent>
          {/* {tipo == 1 &&(<Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIconComponent size={28} />}
            type="search"
          />)} */}
        </NavbarContent>



        <NavbarContent as="div" className="items-center " justify="end" >






        {usuarioLogueado && tipo == 1  &&(
          <NavbarItem>
          <Link to={`ShoppingCart`}><CartIconComponent size={30} /></Link>
        </NavbarItem>
           )}
          


          <SelectComponent></SelectComponent>
          <Dropdown placement="bottom-end ml-6">

          {!usuarioLogueado ? (
          <NavbarItem isActive>
            <Link to={`Login`} color="secondary">
              Login
            </Link>
          </NavbarItem>
           ) : (
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="md"
                showFallback
                  src='https://images.unsplash.com/broken'
              />
            </DropdownTrigger>
            )}
           <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-18 gap-2">
              
                
                <p className="font-semibold">{nombre}</p>
                <p className="font-semibold">{email}</p>
                
                {tipo === 1 ? (
                  <div>
                 <p className="font-semibold py-1">Turista</p>
                 
                 </div>
              ) : (

                <p className="font-semibold">Administrador</p>
                  
              )}
              
              
              


                
              </DropdownItem>


              <DropdownItem key="Registrar">
                {tipo != 1 ? (
                  <Link to={`RegistrarServicio`}>
                    Agregar
                  </Link>
                ) : (<Link to={`ShoppingList`}>Mis compras </Link>)}
              </DropdownItem>
              <DropdownItem key="Listar">
                {tipo != 1 ? (
                  <Link to={`listadoAdministrador`}>
                    Listado
                  </Link>
                ) : (<></>)}
              </DropdownItem>


            <DropdownItem className="py-1" key="logout" color="danger" onClick={handleLogOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>

          </Dropdown>
          <NavbarItem  >
            <SwitchDarkModeComponent />
          </NavbarItem>
        </NavbarContent>


      </Navbar>
      <div id="detail">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
export default NavbarComponent