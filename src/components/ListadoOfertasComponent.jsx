import React from "react";

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
  );
}
