import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, navbar} from "@nextui-org/react";
import AcmeLogoComponent from "./Icons/AcmeLogoComponent";
import SearchIconComponent from "./Icons/SearchIconComponent";
import { Outlet, Link } from "react-router-dom";
import CartIconComponent from "./Icons/CartIconComponent";
import SwitchDarkModeComponent from './SwitchDarkModeComponent';

const NavbarComponent = () => {
    return (
      <>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <AcmeLogoComponent />
            <p className="hidden sm:block font-bold text-inherit">YucExp</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-6">
            <NavbarItem>
            <Link to={`Inicio`}>
                Inicio
              </Link>
            </NavbarItem>
            <NavbarItem >
              <Link to={`Servicios`}>
                Servicios
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link to={`Ofertas`}>
                Paquetes
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link to={`Login`} color="secondary">
                Login
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>
  
        <NavbarContent as="div" className="items-center " justify="end" >
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
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarContent className="sm:flex gap-3 ml-6">
          <NavbarItem>
            <Link to={`ShoppingCart`}><CartIconComponent size={30} /></Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:flex gap-3">
          <NavbarItem>
            <SwitchDarkModeComponent />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div id="detail">
        <Outlet />
      </div>
      </>
    );
  }
export default NavbarComponent