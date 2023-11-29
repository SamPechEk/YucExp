import { Card, CardHeader, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import  Swal  from 'sweetalert2';
import Vmenus from './Vmenus';

export default function ListadoComponent() {
  const [paquetes, setCompras] = useState([]);
  const idMunicipio = localStorage.getItem("selectedMunicipio");
  const token = localStorage.getItem('token');
  const handleDuplicateCarrito = async (idcarrito) => {
    try {
      // Hacer una solicitud POST para duplicar el carrito
      const response = await axios.post('https://yucexpback.onrender.com/api/usuarios/duplicate/car', {
        idusuario: token, // Reemplaza con la lógica para obtener el id del usuario
        idcarrito,
      });

      if (response.data.success) {
        // Vuelve a cargar los datos después de duplicar el carrito
        Swal.fire("Se han añadido los elementos a tu carrito.", '', 'success');
        setTimeout(function() {
          window.location.replace('/ShoppingCart');
        }, 2000);
      } else {
        console.error('Error al duplicar carrito:', response.data.msg);
        // Maneja el error de alguna manera
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      // Maneja el error de alguna manera
    }
  };
  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener los items agregados
    axios.get(`https://yucexpback.onrender.com/api/usuarios/paquetes/${idMunicipio}`)
      .then((response) => {
        setCompras(response.data.carritos); // Ajusta esto según la estructura de tu respuesta
      })
      .catch((error) => {
        console.error('Error al obtener datos de itemcarrito:', error);
      });
  }, []);
  return (
    <div>
      <div className="justify-center items-centr flex py-5">
      {paquetes  ?(
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        
          <>
          {paquetes.map((carrito) => (
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-4">
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <h1 className="text-white  uppercase font-bold">Paquete #{carrito.idcarrito} - Creado el: {new Date(carrito.fechaCreacion).toLocaleDateString()}</h1>
                {carrito.items.map((item) => (
                <p className="text-tyni font-medium ">Categoria: {item.idTipoServicio} - {item.detallesServicio.nombre}</p>
                ))}
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-25"
                src={carrito.items[0].detallesServicio.img}
              />
              <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                  <p className="text-black text-tiny">{carrito.municipio}</p>
                  <p className="text-black text-tiny">Agregar {carrito.items.length} al carrito</p>
                </div>
                <Button className="text-tiny" color="primary" radius="full" size="sm" onClick={() => handleDuplicateCarrito(carrito.idcarrito)}>
                  Añadir al carrito
                </Button>
              </CardFooter>
            </Card>
            ))}
            </>
            </div>
          )
          
       


        
         :(
          <>
          <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-4">
            <h1 className="text-large uppercase font-bold">Sin paquetes disponibles</h1>
            <Vmenus></Vmenus>
            </Card>
          </>
        )} 
      </div>

    </div>

  );
}
