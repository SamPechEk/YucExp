import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { useState, useEffect } from 'react';
import {Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import Swal from 'sweetalert2';
import {Image} from "@nextui-org/react";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure, Input, Checkbox, Link } from "@nextui-org/react";



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

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [datosModal, setDatosModal] = useState({
      nombre: '',
      id: 0,
      context: ''
    });
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
        setDatosModal(datos);
      }

    const Eliminar = () => {
      var id = document.getElementById('id_servicio').value;//obtiene el id del objeto a eliminar
      var nombre = document.getElementById('nombre').value;//obtiene el id del objeto a eliminar
      axios.delete(`http://localhost:7000/obtener/servicios/listado/servicios/eliminar/${id}`)
          .then((response) => {
            
            if (!response.data.success) {
              Swal.fire(response.data.msg, '', 'danger')
              return;
            }
            const updatedItems = datos.filter((d) => d.id !== id);
            setdatos(updatedItems);
            Swal.fire({
              title: "Eliminado " + nombre + " De manera Correcta",
              icon: "danger",
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            } ,
            setTimeout(function() {
              window.location.replace('/listadoAdministrador');
            }, 3000));
          })
          .catch((error) => {
            console.log(error);
            Swal.fire('Hubo un error en la peticion, Contacta al programador', '', 'error')
          });
    }


    return(
    <div className="flex flex-col  items-center  py-10 px-10">
        <Card className="max-w-full max-h-full w-[1200px]">
            <CardHeader>
              <div className="justify-items-start...">
                <h1>Listado de servicios</h1>
              </div>
                <div className="justify-items-end... mr-5">
                  <Button className="" color="success">Registrar</Button>
                </div>
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
                                src={d.img}
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
                                <Button color="warning" onClick={actualizar} onPress={onOpen}>
                                    Editar
                                </Button>
                                <Button color="danger" className="mr-5" onClick={Eliminar}>Eliminar</Button>
                            </div>
                        </div>
                    </AccordionItem>
                    ))}
                </Accordion>

                <div>
                  <Modal 
                    isOpen={isOpen} 
                    onOpenChange={onOpenChange}
                    placement="top-center"
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">Editor</ModalHeader>
                          <ModalBody>
                            <Input
                              autoFocus
                              label="nombre"
                              placeholder="Escribe el nuebo nombre"
                              variant="bordered"
                              value={datosModal.nombre}
                            />
                            <Input
                              label="numero de registro"
                              placeholder="Escribe el nuebo nombre"
                              variant="bordered"
                              value={datosModal.id}
                              isDisabled
                            />
                            <Input
                              label="tipo"
                              placeholder="Escribe el nuebo nombre"
                              variant="bordered"
                              value={datosModal.context}
                              isDisabled
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                              Cancelar
                            </Button>
                            <Button color="primary" onPress={onClose}>
                              Actualizar
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
            </CardBody>
            <CardFooter>
                <h3>Al hacer una modificacion ira directo a la base de datos</h3>
            </CardFooter>
        </Card>
    </div>);
}
export default ListadoAdminComponent;