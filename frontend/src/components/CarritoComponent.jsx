import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import QRCode from "react-qr-code";


const handleReservar = () => {
  Swal.fire({
    title: 'Confirma que deseas proceder con el pago',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Aceptar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      const token = localStorage.getItem('token');
      axios.put('http://localhost:7000/api/usuarios/reser/car', { idusuario: token })
        .then((response) => {
          if (response.data.success) {
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
            setTimeout(function() {
              window.location.replace('/Ofertas');
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error.response.data.msg);
          Swal.fire(error.response.data.msg, '', 'error');
        });
      
    }
    else if (result.isDenied) {
      Swal.fire('Se cancelo correctamente la compra del paquete', '', 'info')
    }
  })
};




const CarritoComponent = () => {
  const [datosItemCarrito, setDatosItemCarrito] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener los items agregados
    axios.get(`http://localhost:7000/api/usuarios/list/car/${token}`)
      .then((response) => {
        setDatosItemCarrito(response.data.items);
      })
      .catch((error) => {
        console.error('Error al obtener datos de itemcarrito:', error);
      });
  }, []);

  const handleEliminarItem = (id) => {
    // Realizar una solicitud DELETE al backend para eliminar el elemento del carrito
    axios.delete(`http://localhost:7000/api/usuarios/delete/caritem/${id}`)
      .then((response) => {
        Swal.fire('Elemento eliminado del carrito:'+response.data.msg, '', 'success')
        // console.log('Elemento eliminado del carrito:', response.data);
        // Actualizar la lista de elementos del carrito después de eliminar el servicio
        const updatedItems = datosItemCarrito.filter((item) => item.iditem !== id);
        setDatosItemCarrito(updatedItems);
      })
      .catch((error) => {
        console.error('Error al eliminar el elemento del carrito:', error);
      });
  };

  return (
    <div className="flex flex-col items-center py-10 px-10">
      <Card className="max-w-full max-h-full w-[900px] h-[600px]">
        <CardHeader className="flex flex-col content-center mr-4">
          <h1 className="text-large uppercase font-bold">Reservaciones</h1>
        </CardHeader>
        <CardBody className="content-start">
          <Table aria-label="Elementos del Carrito">
            <TableHeader>
              <TableColumn>TIPO DE SERVICIO</TableColumn>
              <TableColumn>Servicio</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody>
              {Array.isArray(datosItemCarrito) && datosItemCarrito.map((item) => (
                <TableRow key={item.iditem}>
                  <TableCell>{item.idTipoServicio}</TableCell>
                  <TableCell>
                    {item.detallesServicio && (
                      <Card className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                          <div className="flex flex-col">
                            <p className="text-md">{item.detallesServicio.nombre}</p>
                            <p className="text-small text-default-500">
                              {item.detallesServicio.foto}
                            </p>
                          </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                          <div className="grid grid-cols-2">
                            <Image
                              alt="nextui logo"
                              height={40}
                              radius="sm"
                              src={item.detallesServicio.foto}
                              width={40}
                            />
                            <p>{item.detallesServicio.nombre}</p>
                          </div>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                          <p>{item.detallesServicio.nombre}</p>
                        </CardFooter>
                      </Card>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => handleEliminarItem(item.iditem)}
                    >
                      Eliminar servicio
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-10 flex flex-wrap gap-4 justify-end">
            <Button color="success" onClick={() => handleReservar()}>
              Reservar
            </Button>
            <Link to={`/Ofertas`}>
              <Button color="danger">Cancelar</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CarritoComponent;
