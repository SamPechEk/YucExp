import React from 'react'
import { blogImg1 } from '../assets'
import StarRating from './StarRating'
import { Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import axios from 'axios';
import { useState } from 'react';
import  Swal  from 'sweetalert2';
const Card2 = ({ rest2 }) => {
  const token = localStorage.getItem('token');
  const usuarioLogueado = token !== null;
  const storedMunicipio = localStorage.getItem("selectedMunicipio");
 
    
 
  const handleAddToCart = (tabla,idservicio) => {
  if (tabla) {
    const data = {
      idusuario: token,
      tabla: tabla,
      idservicio: idservicio,
      idMunicipio : storedMunicipio
    };

    axios
    .post('http://localhost:7000/api/usuarios/add/car', data)
    .then((response) => {

      if (response.data.success) {
        Swal.fire(response.data.msg, '', 'success')
        
      }
      console.log('Respuesta del servidor:', response.data);
    })
    .catch((error) => {
      // Maneja errores de la solicitud
      console.log(error.response.data.msg);
      Swal.fire(error.response.data.msg, '', 'error')
    });

  }
  // Realizar la solicitud POST al backend cuando se hace hace el OnClick
  
  };

  const handletoLogin = () => {
    
    window.location.replace('/login');
   
  };

  // console.log(rest2);
  return (
    <div className='z-10 dark:bg-[#0d1b2a] drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4'>
      <img src={rest2.foto}
        className="h-40 w-full object-cover"

      />
      <div className='p-5 border border-b'>
        <h1 className='py-2 dark:text-white truncate'>{rest2.nombre}</h1>
        {/* <StarRating rating={rest2.rating}/> */}

        {!usuarioLogueado ? (
          <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={() => handletoLogin()}>
          Agregar al Carrito
        </Button>
           ) : (
            <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={() => handleAddToCart(rest2.tabla, rest2.idservicio)}>
          Agregar al Carrito
        </Button>
            )}

        
      </div>
      {/* <h3 className='p-5 text-xl'>{rest2.price}</h3> */}
      <div className='absolute top-0 dark:bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
        {''}
      </div>

    </div>
  )
}

export default Card2