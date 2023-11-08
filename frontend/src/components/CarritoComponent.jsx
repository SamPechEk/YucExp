
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


const notification = () => (
  Swal.fire({
    title: 'Confirma que deseas proceder con el pago',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'Aceptar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Muchas Gracias Por Su Preferencia!!!, Le deseamos que disfrute sus vacaciones',
        width: 600,
        padding: '3em',
        color: '#89745F',
        background: '#fff url(/images/trees.png)',
        backdrop: `
                  rgba(0,0,123,0.4)
                  url("../public/gracias-thanks2.gif")
                  center
                  no-repeat
                `
      })
    }
    else if (result.isDenied) {
      Swal.fire('Se cancelo correctamente la compra del paquete', '', 'info')
    }
  })
);

// <<<<<<< YucExp-YXP01-Funcionalidad-Completa


const CarritoComponent = () => {

  const [datosItemCarrito, setDatosItemCarrito] = useState([]);

  useEffect(() => {

    // Hacer una solicitud GET al backend para obtener los items agregados
    axios.get('/api/itemcarrito')
      .then((response) => {
        setDatosItemCarrito(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de itemcarrito:', error);
      });
  }, []);

  const handleEliminarItem = (id) => {

    // Realizar una solicitud DELETE al backend para eliminar el items del carrito
    axios.delete(`/api/itemcarrito/${id}`)
      .then((response) => {
        console.log('Item eliminado del carrito:', response.data);
        // Actualizar la lista de items del carrito después de eliminar el servicio
        const updatedItems = datosItemCarrito.filter((item) => item.id !== id);
        setDatosItemCarrito(updatedItems);
      })
      .catch((error) => {
        console.error('Error al eliminar el item del carrito:', error);
      });
  };
  

  return (
  <div className="flex flex-col  items-center py-10 px-10">
    <Card className="max-w-full max-h-full w-[900px] h-[600px]">
      <CardHeader className="flex flex-col content-center mr-4">
        <h1 className="text-large uppercase font-bold">Reservaciones</h1>
      </CardHeader>
      <CardBody className="content-start">


        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>TIPO DE SERVICIO</TableColumn>
            <TableColumn>Servicio</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>

          <TableBody>

          {datosItemCarrito.map((item) => (
              <TableRow>
                     
                <TableCell>
                hola
                </TableCell>

                <TableCell>
                {datosItemCarrito.length > 0 ? (
                  
                  <Card className="max-w-[400px]" key={1}>
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md">hola</p>
                        <p className="text-small text-default-500">hola</p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <div className="grid grid-cols-2">
                        <Image
                          alt="nextui logo"
                          height={40}
                          radius="sm"
                          src="imagen del servicio"
                          width={40}
                        />
                        <p>hola</p>
                      </div>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <p>hola</p>
                    </CardFooter>
                  </Card>
                  ) : (
                    <small className="text-default-500">*Agrega un restaurante*</small>
                    )}
                </TableCell>

                <TableCell>
                  <Button size="sm" color="danger" onClick={() => handleEliminarItem(item.id)}>
                    Eliminar servicio
                  </Button>
                </TableCell>
                
              </TableRow>
))}


          </TableBody>
        </Table>



        <div className="mt-10 flex flex-wrap gap-4 justify-end">
          <Button color="success" onClick={() => notification()}>
            Reservar
          </Button>
          <Link to={`/Actividades`}>
            <Button color="danger">
              Cancelar
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>

  </div>
  )
                };
// =======
// const CarritoComponent = () => 
// {
//     const [QrValor, setQrValor] = useState('');
//     React.useEffect(() => {
//     const valorQR = {
//         tipo: "objetos",
//         boletos: 2,
//         fecha: "05/11/2023",
//         hora: "11:31am",
    
//     }
//     const datos = JSON.stringify(valorQR);
//     setQrValor(datos);
// },[])
//     return(
//     <div className="flex flex-col  items-center py-10 px-10">
//         <Card className="max-w-full max-h-full w-[600px] h-[900px]">
//             <CardHeader className="flex flex-col content-center mr-4">
//                 <h1>Carrito De Compras</h1>
//             </CardHeader>
//             <CardBody className="content-start">
//                 <div className="flex flex-col items-center">
//                 {/* <Image
//                     isZoomed
//                     width={300}
//                     alt="NextUI Fruit Image with Zoom"
//                     src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
//                 /> */}
//                     <QRCode value={QrValor}/>
//                 </div>

//                 <div className="mt-10">
//                     <h1 className="uppercase font-bold text-xl text-center font-serif">Descripcion General</h1>
//                     <p className="font-bold text-left mt-10">Nombre Del Paquete:</p>
//                     <p className="font-bold text-left mt-5">Tipo:</p>
//                     <p className="font-bold text-left mt-5">Costo:</p>
//                     <p className="font-bold text-left mt-5">Total de boletos:</p>
//                     <p className="font-bold text-left mt-5">Descripcion General:</p>
//                 </div>

//                 <div className="mt-10 flex flex-wrap gap-4 items-center">
//                     <Button color="success" onClick={() => notification()}>
//                         Comprar
//                     </Button>
//                     <Link to={`/Actividades`}>
//                     <Button color="danger">
//                         Cancelar
//                     </Button>
//                     </Link> 
//                 </div>
//             </CardBody>
//         </Card>

//     </div>
//     );
// }
// >>>>>>> main


export default CarritoComponent;