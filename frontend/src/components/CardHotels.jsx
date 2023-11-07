import React from 'react'
import { blogImg1 } from '../assets'
import StarRating from './StarRating'
import { Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';

const CardHotels = () => {


  const [hotels, setHotels] = useState([]);

  //Pedir datos de los "Hoteles" a la DB
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('');
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }

    fetchData();
  }, []); 


  //Enviar datos del "Restaurante" a la DB
  const OnAddHotel = async () => {
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Aqui se enviara el "Transporte" en formato JSON
        body: JSON.stringify(hotel), 
      });

      const data = await response.json();
      console.log(data.mensaje); // Mensaje de la API
    } catch (error) {
      console.error('Error al agregar Hotel:', error);
    }
  };

  return (

    <div className='z-10 dark:bg-[#0d1b2a] drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4'>
      {hotels.map(hotel => (
        <div key={hotel.id}>
          <img src={hotel.linkImg}
            className="h-40 w-full object-cover"
          />
          <div className='p-5 border border-b'>
            <h1 className='py-2 truncate'>{hotel.title}</h1>
            <StarRating rating={hotel.rating} />
            <Input
              type="number"
              label="Agregar al Carrito"
              placeholder="1"
              min={1}
              max={10}
              labelPlacement="outside"
              color='danger'
              variant="bordered"
              errorMessage="Selecciona el numero de Servicios que desea agregar"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">Agregar</span>
                </div>
              }
            />
          </div>
          <h3 className='p-5 text-xl'>{hotel.price}</h3>
          <div className='item-center px-5 py-2'>
            <Link to={`/ShoppingCart`}></Link><Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={OnAddHotel}>
              Agregar al Carrito
            </Button>
          </div>
          <div className='absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
            {hotel.category}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardHotels