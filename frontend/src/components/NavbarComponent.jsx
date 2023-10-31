import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, navbar} from "@nextui-org/react";
import AcmeLogoComponent from "./Icons/AcmeLogoComponent";
import SearchIconComponent from "./Icons/SearchIconComponent";
import { Outlet, Link } from "react-router-dom";
import CartIconComponent from "./Icons/CartIconComponent";
import SwitchDarkModeComponent from './SwitchDarkModeComponent';
import Footer from "./Footer";
import SelectComponent from "./SelectComponent";



const NavbarComponent = () => {
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
<<<<<<< HEAD
              <Link to={`Servicios`}>
              Paquetes
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to={`Ofertas`}>
                Servicios
=======
              <Link to={`Ofertas`}>
                Servicios
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to={`Servicios`}>
                Paquetes
>>>>>>> 9a5985f633c1fec25275ca7cfe6ceb15a942dc5b
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
        
         <NavbarItem isActive>
            <Link to={`Login`} color="secondary">
              Login
            </Link>
          </NavbarItem>

          
          
          <Dropdown placement="bottom-end ml-6">
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
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
              <Link to={`ShoppingList`}>
                <p className="font-semibold">Mis Compras</p>
                <p className="font-semibold">zoey@example.com</p>
              </Link>
              </DropdownItem>
              
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        

          <NavbarItem>
            <Link to={`ShoppingCart`}><CartIconComponent size={30} /></Link>
          </NavbarItem>

         <NavbarItem>
            <SwitchDarkModeComponent />
          </NavbarItem>
          <SelectComponent></SelectComponent>
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