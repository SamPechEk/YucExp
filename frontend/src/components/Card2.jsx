import React from 'react'
import { blogImg1 } from '../assets'
import StarRating from './StarRating'
import { Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import axios from 'axios';

const Card2 = ({ rest2 }) => {


  const handleAddToCart = () => {
    // Realizar la solicitud POST al backend cuando se hace clic en el botón
    axios.post('http://localhost:7000/api/cart', {
      item: rest2,  // Envía el objeto del servicio al backend
    })
      .then((response) => {
        console.log('Item agregado al carrito:', response.data);
        // Realiza alguna acción adicional si es necesario
      })
      .catch((error) => {
        console.error('Error al agregar el item al carrito:', error);
      });
  };


  
  // console.log(rest2);
  return (
    <div className='z-10 dark:bg-[#0d1b2a] drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4'>
      <img src={rest2.img}
        className="h-40 w-full object-cover"

      />
      <div className='p-5 border border-b'>
        <h1 className='py-2 dark:text-white truncate'>{rest2.nombre}</h1>
        {/* <StarRating rating={rest2.rating}/> */}
      </div>
      {/* <h3 className='p-5 text-xl'>{rest2.price}</h3> */}

      <div className='absolute top-0 dark:bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
        {''}
      </div>
      <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={handleAddToCart}>
        Agregar al Carrito
      </Button>
    </div>
  )
}

export default Card2