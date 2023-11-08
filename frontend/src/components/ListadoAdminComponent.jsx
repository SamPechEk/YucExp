import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useState, useEffect } from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import Swal from 'sweetalert2';
import {Image} from "@nextui-org/react";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter } from "@nextui-org/react";



const ListadoAdminComponent = () =>{
    const [valorContext, setvalorContext] = useState("");
    const [datos,setdatos] = useState([]);

    const filtrar = (event) => {
        setvalorContext(event.target.value);
        const valor = {
            context : event.target.value
        }
        if(datos.length > 0){
            setdatos([]);
        }
        console.log(valor);
        axios.post('http://localhost:7000/obtener/servicios/listado/servicios', valor)
          .then((response) => {
            
            if (!response.data.success) {
              Swal.fire(response.data.msg, '', 'danger')
              return;
            }
              setdatos(response.data.msg);//le pasamos la respuesta del servidor con los datos            
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(error.response.data.msg, '', 'error')
          });
    }


    const actualizar = (e) =>{
        var id = document.getElementById('id_servicio').value;
        var nombre = document.getElementById('nombre').value;
        var modificado = JSON.stringify(nombre);
        console.log(id, nombre, modificado);
        console.log(valorContext);
        let datos = {
            context : valorContext,
            id : id,
            nombre : nombre
        }

        Swal.fire({
            title: "Nuevo Nombre",
            input: "text",
            inputValue:nombre,
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Look up",
            showLoaderOnConfirm: true,
            preConfirm: async (login) => {
              try {
                const githubUrl = `
                  https://api.github.com/users/${login}
                `;
                const response = await fetch(githubUrl);
                if (!response.ok) {
                  return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                  `);
                }
                return response.json();
              } catch (error) {
                Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url
              });
            }
          });
    }


    return(
    <div className="flex flex-col  items-center  py-10 px-10">
        <Card className="max-w-full max-h-full w-[1200px]">
            <CardHeader>
                <h1>Listado de servicios</h1>
            </CardHeader>
            <CardBody>
                <div className="items-center pt-5">
                    <Select defaultSelectedKeys={["0"]} onChange={filtrar} label="Selecciona el filtro">
                        <SelectItem key={"0"}>Selecciona Un Listado</SelectItem>
                        <SelectItem key={"hoteles"} value={""}>Hoteles</SelectItem>
                        <SelectItem key={"restaurantes"} value={""}>Restaurantes</SelectItem>
                        <SelectItem key={"lugares"} value={""}>Lugares</SelectItem>
                        <SelectItem key={"actividades"} value={""}>Localidades</SelectItem>
                    </Select>
                </div>
                <Accordion variant="light" className="pt-10">
                    {datos.map( (d) => 
                    (<AccordionItem key={d.id} aria-label="Accordion 1" title={d.nombre}>
                        <div> 
                            <div className="flex flex-wrap gap-6 items-right">
                            <Image
                                isZoomed
                                width={300}
                                alt={300}
                                src={d.foto}
                            />
                                {d.calificacion ? 
                                (<p className="font-bold">La calificacion es de: {d.calificacion} estrellas</p>)
                                :
                                (<p className="font-bold">La calificacion es desconocida</p>)}
                                <br />
                                <p className="font-bold">En el municipio de: {d.nomMunicipio}</p>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-4 items-right">
                                <input type="hidden" id="id_servicio" value={d.id}/>
                                <input type="hidden" id="nombre" value={d.nombre}/>
                                <Button color="warning" onClick={actualizar}>
                                    Editar
                                </Button>
                                <Button color="danger" className="mr-5">Eliminar</Button>
                            </div>
                        </div>
                    </AccordionItem>
                    ))}
                </Accordion>
            </CardBody>
            <CardFooter>
                <h3>Al hacer una modificacion ira directo a la base de datos</h3>
            </CardFooter>
        </Card>
    </div>);
}
export default ListadoAdminComponent;