import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import React,{ useState } from 'react';
import {Image} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { Link} from "react-router-dom";
import Swal from 'sweetalert2';
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
                  left top
                  no-repeat
                `
              })
            } 
              else if (result.isDenied) {
          Swal.fire('Se cancelo correctamente la compra del paquete', '', 'info')
        }
      })
);

const CarritoComponent = () => 
{
    const [QrValor, setQrValor] = useState('');
    React.useEffect(() => {
    const valorQR = {
        tipo: "objetos",
        boletos: 2,
        fecha: "05/11/2023",
        hora: "11:31am",
    
    }
    const datos = JSON.stringify(valorQR);
    setQrValor(datos);
},[])
    return(
    <div className="flex flex-col  items-center py-10 px-10">
        <Card className="max-w-full max-h-full w-[600px] h-[900px]">
            <CardHeader className="flex flex-col content-center mr-4">
                <h1>Carrito De Compras</h1>
            </CardHeader>
            <CardBody className="content-start">
                <div className="flex flex-col items-center">
                {/* <Image
                    isZoomed
                    width={300}
                    alt="NextUI Fruit Image with Zoom"
                    src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
                /> */}
                    <QRCode value={QrValor}/>
                </div>

                <div className="mt-10">
                    <h1 className="uppercase font-bold text-xl text-center font-serif">Descripcion General</h1>
                    <p className="font-bold text-left mt-10">Nombre Del Paquete:</p>
                    <p className="font-bold text-left mt-5">Tipo:</p>
                    <p className="font-bold text-left mt-5">Costo:</p>
                    <p className="font-bold text-left mt-5">Total de boletos:</p>
                    <p className="font-bold text-left mt-5">Descripcion General:</p>
                </div>

                <div className="mt-10 flex flex-wrap gap-4 items-center">
                    <Button color="success" onClick={() => notification()}>
                        Comprar
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
    );
}


export default CarritoComponent;