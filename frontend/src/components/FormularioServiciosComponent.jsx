import {Select, SelectItem} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { Link} from "react-router-dom";
import Swal from 'sweetalert2';
import React,{ useState } from 'react';
import {Input} from "@nextui-org/react";
import Extencion from "./ExtencionFormularioComponent";
import axios from "axios";

const FormularioServiciosComponent = () =>
{
  const [datosSelect, setdatosSelect] = useState([]);
          axios.get('http://localhost:7000/api/usuarios/getServicios')
          .then((response) => {
            
            if (!response.data.success) {
              Swal.fire(response.data.msg, '', 'danger')
              return;
            }
            console.log('Respuesta del servidor:', response.data.msg);
            setdatosSelect(response.data.msg);
            console.log(datosSelect);
          })
          .catch((error) => {
            // Maneja errores de la solicitud
            Swal.fire(error.response.data.msg, '', 'error')
          });


  // const datosSelect = [
  //   {label:"Seleccionar", value:"0"},
  //   {label:"Hotel", value:"1"},
  //   {label:"Transporte", value:"2"},
  //   {label:"Lugar", value:"3"},
  //   {label:"Restaurante", value:"4"},
  //   {label:"Guia", value:"5"}
    
  // ]
  const [show, setShow] = useState('');

  const showContent = (event) => {
    // const [show, setShow] = React.useState(true);
    var valor = event.target.value;
    setShow(valor);
    // console.log(valor)
}

  return (
    <div className="flex flex-col  items-center  py-10 px-10">
        <Card className="max-w-full max-h-full w-[600px]">
            <CardHeader className="flex flex-col content-center">
                <h2>Formulario De Registro de servicios</h2>
            </CardHeader>
            <CardBody className="content-center">
                <div className="items-center">
                    <Select
                        isRequired
                        label="Tipo Servicio"
                        placeholder="Selecciona el tipo de servicio"
                        // defaultSelectedKeys={["0"]}
                        className="max-w-full"
                        onChange={showContent}
                    >
                        {datosSelect.map((nomdata) =>(
                          <SelectItem key={nomdata.idTipo} value={nomdata.idTipo}>
                            {nomdata.nombreTabla}
                          </SelectItem>
                        ))}
                    </Select>               
                </div>

                <div>
                  {/* <Extencion showContent={show}></Extencion> */}
                </div>
            </CardBody>
        </Card>
    </div>

  );

}

export default FormularioServiciosComponent;