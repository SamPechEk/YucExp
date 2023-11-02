import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, navbar} from "@nextui-org/react";
import AcmeLogoComponent from "./Icons/AcmeLogoComponent";
import SearchIconComponent from "./Icons/SearchIconComponent";
import { Outlet, Link } from "react-router-dom";
import CartIconComponent from "./Icons/CartIconComponent";
import SwitchDarkModeComponent from './SwitchDarkModeComponent';
import Footer from "./Footer";
import SelectComponent from "./SelectComponent";
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import  axios  from 'axios';




const NavbarComponent = () => {
  const token = localStorage.getItem('token');
  const usuarioLogueado = token !== null;

  const [nombre, setNombre] = useState("null");
  const [email, setEmail] = useState("null");
  const [tipo, setTipo] = useState("null");


  useEffect(() => {
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
  }, []);

  const handleLogOut = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
    Swal.fire('Sesión cerrada correctamente', '', 'success')
    setTimeout(function() {
      window.location.replace('/login');
    }, 3000);
    // Redirigir al usuario a la página de inicio de sesión u otra página, si es necesario
    // window.location.replace('/login'); // Ejemplo de redirección
  };
    return (
      <>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-2">
            <AcmeLogoComponent />
            <p className="hidden sm:block font-bold text-inherit">YucExp</p>
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
              <Link to={`Servicios`}>
                Paquetes
              </Link>
            </NavbarItem>
            
           
          </NavbarContent>
          <Input
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
          />
        </NavbarContent>
  
        

       <NavbarContent as="div" className="items-center " justify="end" >
        
         

          
          
          

          <NavbarItem>
            <Link to={`ShoppingCart`}><CartIconComponent size={30} /></Link>
          </NavbarItem>

         
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
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            )}
           <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <Link to={`ShoppingList`}>
                
                <p className="font-semibold">{nombre}</p>
                <p className="font-semibold">{email}</p>
                
                {tipo === 1 ? (
                  <div>
                 <p className="font-semibold">Turista</p>
                 <p className="font-semibold">Mis Compras</p>
                 </div>
              ) : (
                    <p className="font-semibold">Administrador</p>
              )}
              </Link>

            </DropdownItem>

            <DropdownItem key="Registrar">
            {tipo != 1 ? (
                <Link to={`RegistrarServicio`}>
                   Agregar
                  </Link>
              ):( <div> </div>)}
            </DropdownItem>

            <DropdownItem key="logout" color="danger" onClick={handleLogOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
          </Dropdown>
          <NavbarItem>
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