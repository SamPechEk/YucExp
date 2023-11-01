import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

// const [activador, setActivador] = useState(false);

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


const CarritoComponent = () => (
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
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Restaurante</TableCell>

              <TableCell><small className="text-default-500">*Agrega un restaurante*</small></TableCell>
              <TableCell>
                <Button size="sm" color="primary">
                  Eliminar servicio
                </Button>
              </TableCell>
              
            </TableRow>
            <TableRow key="2">
              <TableCell>Hoteles</TableCell>
              <TableCell><small className="text-default-500">*Agrega un Hotel*</small></TableCell>
              <TableCell>
                <Button size="sm" color="primary">
                  Eliminar servicio
                </Button>
              </TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Transporte</TableCell>
              <TableCell><small className="text-default-500">*Agrega un Transporte*</small></TableCell>
              <TableCell>
                <Button size="sm" color="primary">
                  Eliminar servicio
                </Button>
              </TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Actividades</TableCell>
              <TableCell><small className="text-default-500">*Agrega una Actividad*</small></TableCell>
              <TableCell>
                <Button size="sm" color="primary">
                  Eliminar servicio
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Card className="">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-small uppercase font-bold">Total de Reservaciones:</p>
            <small className="font-bold">12 Servicios</small>
            <small className="text-default-500">Confirma tus reservaciones</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">

          </CardBody>
          <CardFooter>
            <Button className="justify-item-center" color="warning" variant="ghost" size="sm">
              Vaciar carrito de Reservaciones
            </Button>
          </CardFooter>
        </Card>

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
);


export default CarritoComponent;