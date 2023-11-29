import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ConfirmarCuenta() {
  const params = useParams();
  const { token } = params;
  

  const confirmarCuentas = () => {
    
    
    axios
      .get(`http://localhost:7000/api/usuarios/confirma/${token}`)
      .then((response) => {

        if (response.data.success) {
          Swal.fire(response.data.msg, '', 'success');
        }
        setTimeout(function() {
          window.location.replace('/Login');
        }, 2000);
        // console.log('Respuesta del servidor:', response);
      })
      .catch((error) => {
        // Maneja errores de la solicitud
        // console.log(error.response.data.msg);
        Swal.fire(error.response.data.msg, '', 'error')
      });
   
      return;
  };
  

  return (
    <div className='flex justify-center items-center'>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta y comienza a Visitar{' '}
        <span className="text-slate-700">Lugares</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">

      <Link 
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          onClick={confirmarCuentas}
      >Inicia Sesión</Link>
        
        
      </div>
    </div>
  );
};

