import React from "react";
import Vmenus from "./Vmenus";

import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";


export default function ListadoOfertasComponent() {
  
  const list = [
        
    {
      title: "Mérida, Yuc.",
      img: "https://littlevisuals.co/images/bronica.jpg",
      price: "",
    },
    {
      title: "Valladolid, Yuc.",
      img: "https://littlevisuals.co/images/downtown.jpg",
      price: "",
    },
    {
      title: "Progreso, Yuc",
      img: "https://littlevisuals.co/images/red_dawn.jpg",
      price: "",
    },
    {
      title: "Celestun, Yuc.",
      img: "https://littlevisuals.co/images/whisp.jpg",
      price: "",
    }
  ];

  return (

    <div className='w-full dark:bg-[#0d1b2a] items-center py-10 px-10'>
      <div  className='md:max-w-[1000px] m-auto grid md:grid-cols-1 max-w-[1000px]  px-4 md:px-5'>
      <div className='flex flex-col justify-start gap-4'>
                <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Selecciona tu <span className='text-[#DB5A42]'>destino</span> para elegir tus servicios.
                </h1> 
      </div>
      </div>
    <div className="gap-2 grid grid-cols-3 sm:grid-cols-2 py-5">
      
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[400px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>


      ))}

      

    </div>
    <Vmenus/></div>
  );
}
