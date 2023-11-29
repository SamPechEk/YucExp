import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import axios from 'axios';
import Vmenus from "./Vmenus";

export default function ListadoOfertasComponent() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const storedMunicipio = localStorage.getItem("selectedMunicipio");
    // Realiza una solicitud Axios para obtener los registros aleatorios
    axios.get(`https://yucexpback.onrender.com/api/usuarios/randomServices/${storedMunicipio}`)
      .then((response) => {
        setOfertas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener ofertas aleatorias:', error);
      });
  }, []);

  return (
    <div className='w-full dark:bg-[#0d1b2a] items-center py-10 px-10'>
      <div className='md:max-w-[1000px] m-auto grid md:grid-cols-1 max-w-[1000px] px-4 md:px-5'>
        <div className='flex flex-col justify-start gap-4'>
          <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Conoce cosas nuevas para ese viaje soñado:</h1>
        </div>
      </div>
      <div className="gap-2 grid grid-cols-3 sm:grid-cols-2 py-5">
        {ofertas.map((item, index) => (
          <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.nombre}
                className="w-full object-cover h-[400px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.nombre}</b>
              <p className="text-default-500">{item.tabla}</p>
            </CardFooter>
          </Card>
        ))}
        
      </div>
      <div>
      <Vmenus/>   
      </div>
      
    </div>
  );
}
