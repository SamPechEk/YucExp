import React,{ useState } from 'react';
import {Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";





const ExtencionFormularioComponent = (show) => {
const [informacion,infovalor] =React.useState('');
console.log(show);

    const [datos, vaolordatos] = React.useState();
  
      // const [show, setShow] = React.useState(true);
      vaolordatos(show)
      var mensaje = "";
      // var valor = datos;
      switch (datos) {
        case "":
          mensaje ="no has seleccionado nada"
          break;
        case "1":
          mensaje = "Seleccionaste Hoteles";
          break;
        case "2":
          mensaje ="Seleccionaste Transportes";
          break;
        case "3":
          mensaje = "Seleccionaste Lugares";
          break;
        case "4":
          mensaje = "Seleccionaste Restaurantes";
          break;
        case "5":
          mensaje = "Seleccionaste Guias";
          break;
      }
          infovalor(mensaje);
          console.log(mensaje);
    
 
  return(
    <div>
      <h1>
        {informacion}
      </h1>
    </div>
  );
}

export default ExtencionFormularioComponent;