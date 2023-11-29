import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Accordion, AccordionItem, Avatar } from "@nextui-org/react";

const ListadoComprasComponent = () => {
  const [compras, setCompras] = useState([]);
  // const { idUsuario } = useParams(); // Asegúrate de tener configurado React Router correctamente
  const token = localStorage.getItem('token');


  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener los items agregados
    axios.get(`http://localhost:7000/api/usuarios/historial/car/${token}`)
      .then((response) => {
        setCompras(response.data.items); // Ajusta esto según la estructura de tu respuesta
      })
      .catch((error) => {
        console.error('Error al obtener datos de itemcarrito:', error);
      });
  }, []);

console.log(compras);
  return (

    <div className="flex flex-col items-center py-10 px-10">
      <Card className="max-w-full max-h-full w-[600px] h-[900px]">
        <CardHeader className="flex flex-col content-center mr-4">
          <h1 className="text-large uppercase font-bold">Historial de servicios</h1>
          </CardHeader>
        <CardBody>
          <Accordion selectionMode="multiple">
            {compras.map((compra, index) => (
              <AccordionItem
                key={index.toString()}
                startContent={
                  <Avatar
                  size="lg"
                    src={compra.detallesServicio.foto} // Ajusta la ruta de la imagen según la estructura de tu respuesta
                  />
                }
                title={compra.detallesServicio.nombre}
                subtitle={compra.idTipoServicio}
              >
                <div className="max-w-md">
                  <div className="space-y-1">
                    <a
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1 font-small text-gray-600 hover:bg-gray-100"
                    >
                      Fecha de creación: {`${new Date(compra.fechaCreacion).toLocaleDateString()}`}
                    </a>
                  </div>
                  <Divider className="my-4" />
                  <div className="flex h-5 items-center space-x-4 text-small">
                    <div>Número de carrito: {compra.idcarrito}</div>
                    <Divider orientation="vertical" />
                    <div>{compra.detallesServicio.nombre}</div>
                    <Divider orientation="vertical" />
                    <div>{compra.idTipoServicio}</div>
                  </div>
                  <Divider className="my-4" />
                </div>
                <Image
                  isZoomed
                  height={200}
                  src={compra.detallesServicio.foto} alt="Imagen del Servicio" />
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </div>
  );
};

export default ListadoComprasComponent;
