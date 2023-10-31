import React from 'react'
import { blogImg1 } from '../assets'
import StarRating from './StarRating'
import {Input} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {Button} from "@nextui-org/react";

const Card2 = ({rest2}) => {
  // console.log(rest2);
  return (
    <div className='z-10 dark:bg-[#0d1b2a] drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4'>
        <img src={rest2.img} 
                className="h-40 w-full object-cover"
        
        />
        <div className='p-5 border border-b'>
<<<<<<< HEAD
            <h1 className='py-2 truncate'>{rest2.title}</h1>
            <StarRating rating={rest2.rating}/>
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
        <h3 className='p-5 text-xl'>{rest2.price}</h3>
        <div className='item-center px-5 py-2'>
        <Link to={`/ShoppingCart`}><Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
           Agregar al Carrito
        </Button></Link>
        </div>
=======
            <h1 className='py-2 dark:text-white truncate'>{rest2.nombre}</h1>
            {/* <StarRating rating={rest2.rating}/> */}
        </div>
        {/* <h3 className='p-5 text-xl'>{rest2.price}</h3> */}
>>>>>>> 9a5985f633c1fec25275ca7cfe6ceb15a942dc5b

        <div className='absolute top-0 dark:bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
            {''}
        </div>
    </div>
  )
}

export default Card2