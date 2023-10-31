import React,{ useState } from 'react';
import {Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";





const ExtencionFormularioComponent = (show) => {
const [informacion,infovalor] =React.useState('');
console.log(show);

    
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