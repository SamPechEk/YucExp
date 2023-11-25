import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ListadoComprasComponent = () => {
  const [carritos, setCompras] = useState([]);
  const [muni, setMuni] = useState("");
  const { t } = useParams();
  // const { idUsuario } = useParams(); // Asegúrate de tener configurado React Router correctamente
  const token = localStorage.getItem('token');


  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener los items agregados
    axios.get(`http://localhost:7000/api/usuarios/historial2/car/${token}`)
      .then((response) => {
        setCompras(response.data.carritos); // Ajusta esto según la estructura de tu respuesta
        setMuni(response.data.municipio);
      })
      .catch((error) => {
        console.error('Error al obtener datos de itemcarrito:', error);
      });
  }, []);

  useEffect(() => {
    // Verifica si 't' tiene un valor

    // Lógica adicional que deseas ejecutar al inicio
    // ...
    if (t) {
      Swal.fire({
        title: 'Muchas Gracias Por Su Preferencia!!!, Le deseamos que disfrute sus vacaciones',
        width: 600,
        padding: '3em',
        color: '#89745F',
        background: '#fff url(/images/trees.png)',
        backdrop: `
                  rgba(0,0,123,0.4)
                  url("../public/gracias-thanks2.gif")
                  left top
                  no-repeat
                `
      })
    }
   
    
  }, []);


  return (
    
    <div className="flex flex-col items-center py-10 px-10">
      <Card className="max-w-full max-h-full w-[600px] h-[900px]">
        <CardHeader className="flex flex-col content-center mr-4">
          <h1 className="text-large uppercase font-bold">Historial de servicios</h1>
          </CardHeader>
          <CardBody>
  <Accordion selectionMode="multiple">
    {carritos.map((carrito) => (
      <AccordionItem
        key={carrito.idcarrito}
        startContent={
          <Avatar
            size="lg"
            src={carrito.items[0].detallesServicio.img} // Ajusta la ruta de la imagen según la estructura de tu respuesta
          />
        }
        title={`${carrito.municipio} - Carrito #${carrito.idcarrito} - Donativo: $${carrito.donativo}`}
        subtitle={`Fecha de creación: ${new Date(carrito.fechaCreacion).toLocaleDateString()}`}
      >
        <div className="max-w-md">
          <ul>
            {carrito.items.map((item) => (
              <li key={item.iditem}>
                <p>{item.detallesServicio.nombre} - Categoria: {item.idTipoServicio}</p>
                
                {/* Agrega más detalles si es necesario */}
              </li>
            ))}
          </ul>
        </div>
      </AccordionItem>
    ))}
  </Accordion>
</CardBody>


      </Card>
    </div>
  );
};

export default ListadoComprasComponent;
