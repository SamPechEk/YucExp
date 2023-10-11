import React from "react";

import {Card, CardHeader, CardBody, Image, User, Input, Button, } from "@nextui-org/react";
import EyeFilledIconComponent from "./Icons/EyeFilledIconComponent";
import EyeSlashFilledIconComponent from "./Icons/EyeSlashFilledIconComponent";



export default function FormularioAdminComponent() {

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    
    <Card className="py-4 ">
        <User 
        name="Admin"
        description="Admin YUCEXP"
        status="Active"
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
        }}
      />
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Perfil Administrador</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Input className="pt-2 px-4" type="name" label="Name" placeholder="Enter your Name"/>
        <Input className="pt-2 px-4" type="lastname" label="Last Name" placeholder="Enter your Last Name"/>
        <Input className="pt-2 px-4" type="email" label="Email" placeholder="Enter your email"/>
        <Input
                          label="Password"
                          className="pt-2 px-4"
                          labelPlacement="outside"
                          placeholder="Ingresa tu contraseña"
                          endContent={
                              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                              {isVisible ? (
                                  <EyeSlashFilledIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                              ) : (
                                  <EyeFilledIconComponent className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                              )}
                              </button>
                          }
                          type={isVisible ? "text" : "password"}
                          
                          />
                <div className="flex gap-2 pt-2 px-4 ">
                  <Button fullWidth color="secondary">
                    Sign up
                  </Button>
                </div>
      </CardBody>
    </Card>
  );
}


