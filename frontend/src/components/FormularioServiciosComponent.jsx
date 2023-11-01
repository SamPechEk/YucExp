import {Select, SelectItem} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { Link} from "react-router-dom";
import Swal from 'sweetalert2';
import React,{ useState, Component } from 'react';
import {Input} from "@nextui-org/react";
import axios from "axios";
import {useForm} from "react-hook-form";
const FormularioServiciosComponent = () =>
{
  const [datosSelect, setdatosSelect] = useState([]);

  
  React.useEffect(()=>{
    axios.get('http://localhost:7000/obtener/servicios/getServicios')
    .then((response) => {
      
      if (!response.data.success) {
        Swal.fire(response.data.msg, '', 'danger')
        return;
      }
      if(!datosSelect.length > 0){
        setdatosSelect(response.data.msg);
      }
    })
    .catch((error) => {
      Swal.fire(error.response.data.msg, '', 'error')
    });
  },[])

          const {register, handleSubmit, formState:{ errors }} = useForm();
         
          // const datosSelect = [
          //   {nombreTabla:"Seleccionar", idTipo:"0"},
          //   {nombreTabla:"Hotel", idTipo:"1"},
          //   {nombreTabla:"Transporte", idTipo:"2"},
          //   {nombreTabla:"Lugar", idTipo:"3"},
          //   {nombreTabla:"Restaurante", idTipo:"4"},
          //   {nombreTabla:"Guia", idTipo:"5"}
            
          // ]
          const [show, setShow] = useState('');// escucha cuando el valor de lo que se desee agregar cambia

          const showContent = (event) => {
            // al modificar el valor del select llama a esta funcion para actualizar el formulario a mostrar
            console.log(datosSelect);
            var valor = event.target.value;
            setShow(valor);
        }

        const onSubmit = (values) =>{
          // const datos = {
          //   tipo : show,
          //   nombre : values.nombre,
          //   municipio : values.municipio,
          //   calificacion : values.calificacion,
          //   idLugar : values.idLugar,
          //   direccion : values.direccion,
          //   idTipoTransporte : values.idTipoTransporte,
          //   foto: values.foto[0],
          // }
          // console.log(" este es el nuevo =>",datos);

          const formData = new FormData();
          formData.set('tipo',show);
          formData.set('nombre', values.nombre);
          formData.set('municipio', values.municipio);
          formData.set('calificacion', values.calificacion);
          formData.set('idLugar', values.idLugar);
          formData.set('direccion', values.direccion);
          formData.set('idTipoTransporte', values.idTipoTransporte);
          formData.set('foto', values.foto[0]);

          axios.post('http://localhost:7000/obtener/servicios/registrarServicio', formData).then((response) =>{
            if(!response.data.success){
              Swal.fire(response.data.msg,'','error')
            }
            else{
            Swal.fire(response.data.msg, '','success')
            }
          }).catch((error) => {
            Swal.fire(error.data.msg,'','error')
          });

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
                        defaultSelectedKeys={["0"]}
                        className="max-w-full"
                        onChange={showContent}
                        name="tipo"
                    >
                      <SelectItem key={"0"}>Selecciona el tipo de servicio</SelectItem>
                        {datosSelect.map((nomdata) =>(
                          <SelectItem key={nomdata.idTipo} value={nomdata.idTipo}>
                            {nomdata.nombreTabla}
                          </SelectItem>
                        ))}
                    </Select>               
                </div>

                {/* <div dangerouslySetInnerHTML={{__html: show}}> */}
                  {show === "1" &&(
                    <form onSubmit={handleSubmit(onSubmit)}>

                      <div className="pt-5">
                        <h1>Formulario Hoteles</h1>
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                          <Input 
                            className="max-w-xs" type="text" label="nombre" 
                            placeholder="Escribe el nombre del hotel"
                            name="nombre"
                            {...register("nombre",{
                              required:"Required", message:'Este campo es obligatorio'})}/>
                              {errors.nombre && "este campo es obligatorio"}   

                          <Select
                            label="Selecciona El Municipio"
                            name="municipio"
                            placeholder="Selecciona un municipio"
                            className="max-w-sm"
                            {...register("municipio",{
                              required:"Required", message:'Este campo es obligatorio'})}
                          >
                              <SelectItem key={"1"} value={"1"}>
                                Conkal
                              </SelectItem>
                              <SelectItem key={"2"} value={"2"}>
                                Acanceh
                              </SelectItem>
                              <SelectItem key={"3"} value={"3"}>
                                ChichenItza
                              </SelectItem>
                              <SelectItem key={"4"} value={"4"}>
                                Homun
                              </SelectItem>
                          </Select>
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                          <Input name="foto" {...register("foto",{
                              required:"Required", message:'Este campo es obligatorio'})} className="max-w-xs" type="file" label="Selecciona Una Imagen" placeholder="Inserta una foto del Hotel" />

                          <Select
                            label="Selecciona la calificacion"
                            placeholder="Selecciona la calificacion"
                            name="calificacion"
                            className="max-w-md"
                            {...register("calificacion",{
                              required:"Required", message:'Este campo es obligatorio'})}
                          >
                              <SelectItem key={"0"} value={""}>
                                Desconocida
                              </SelectItem>
                              <SelectItem key={"2"} value={"2"}>
                                2 estrellas
                              </SelectItem>
                              <SelectItem key={"3"} value={"3"}>
                                3 estrellas
                              </SelectItem>
                              <SelectItem key={"4"} value={"4"}>
                                4 estrellas
                              </SelectItem>
                              <SelectItem key={"5"} value={"5"}>
                                5 estrellas
                              </SelectItem>
                          </Select>
                      </div>
    
                      <div className="pt-5">
                        <Button color="success" type="submit"> Guardar</Button>
                      </div>
                    </form>
                  )}
                  {show === "2" &&(
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="pt-5">
                      <h1>Formulario Transportes</h1>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input 
                          className="max-w-xs" type="text" label="nombre" 
                          placeholder="Escribe el nombre del transporte"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                            {errors.nombre && "este campo es obligatorio"}   

                        <Select
                          label="Municipio"
                          name="municipio"
                          placeholder="Selecciona un municipio"
                          className="max-w-sm"
                          {...register("municipio",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            <SelectItem key={"1"} value={"1"}>
                              Conkal
                            </SelectItem>
                            <SelectItem key={"2"} value={"2"}>
                              Acanceh
                            </SelectItem>
                            <SelectItem key={"3"} value={"3"}>
                              ChichenItza
                            </SelectItem>
                            <SelectItem key={"4"} value={"4"}>
                              Homun
                            </SelectItem>
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Select
                          label="Calificacion"
                          placeholder="Selecciona la calificacion"
                          name="calificacion"
                          className="max-w-md"
                          {...register("calificacion",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            <SelectItem key={"0"} value={""}>
                              Desconocida
                            </SelectItem>
                            <SelectItem key={"2"} value={"2"}>
                              2 estrellas
                            </SelectItem>
                            <SelectItem key={"3"} value={"3"}>
                              3 estrellas
                            </SelectItem>
                            <SelectItem key={"4"} value={"4"}>
                              4 estrellas
                            </SelectItem>
                            <SelectItem key={"5"} value={"5"}>
                              5 estrellas
                            </SelectItem>
                        </Select>
                        <Select
                          label="Tipo Transporte"
                          placeholder="Selecciona el tipo de transporte"
                          name="idTipoTransporte"
                          className="max-w-md"
                          {...register("idTipoTransporte",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            <SelectItem key={"0"} value={""}>
                              Desconocida
                            </SelectItem>
                            <SelectItem key={"1"} value={"1"}>
                              Autobus
                            </SelectItem>
                            <SelectItem key={"3"} value={"3"}>
                              Barco
                            </SelectItem>
                            <SelectItem key={"4"} value={"4"}>
                              Privado
                            </SelectItem>
                        </Select>
                    </div>

                    <div className="pt-5">
                      <Button color="success" type="submit"> Guardar</Button>
                    </div>
                    </form>
                  )}
                  {show === "3" &&(
                    <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="pt-5">
                      <h1>Formulario Lugares</h1>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input 
                          className="max-w-xs" type="text" label="nombre" 
                          placeholder="Escribe el nombre del lugar"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                            {errors.nombre && "este campo es obligatorio"}   

                        <Select
                          label="Municipio"
                          name="municipio"
                          placeholder="Selecciona un municipio"
                          className="max-w-sm"
                          {...register("municipio",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            <SelectItem key={"1"} value={"1"}>
                              Conkal
                            </SelectItem>
                            <SelectItem key={"2"} value={"2"}>
                              Acanceh
                            </SelectItem>
                            <SelectItem key={"3"} value={"3"}>
                              ChichenItza
                            </SelectItem>
                            <SelectItem key={"4"} value={"4"}>
                              Homun
                            </SelectItem>
                        </Select>
                    </div>

                    <div className="pt-5">
                      <Button color="success" type="submit"> Guardar</Button>
                    </div>
                    </form>
                  )}
                  {show === "4" &&(
                    <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="pt-5">
                      <h1>Formulario Actividades</h1>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input 
                          className="max-w-xs" type="text" label="nombre" 
                          placeholder="Escribe el nombre de la actividad"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                            {errors.nombre && "este campo es obligatorio"}   

                        <Select
                          label="Municipio"
                          name="municipio"
                          placeholder="Selecciona un municipio"
                          className="max-w-sm"
                          {...register("municipio",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            <SelectItem key={"1"} value={"1"}>
                              Conkal
                            </SelectItem>
                            <SelectItem key={"2"} value={"2"}>
                              Acanceh
                            </SelectItem>
                            <SelectItem key={"3"} value={"3"}>
                              ChichenItza
                            </SelectItem>
                            <SelectItem key={"4"} value={"4"}>
                              Homun
                            </SelectItem>
                        </Select>
                    </div>

                    <div className="pt-5">
                      <Button color="success" type="submit"> Guardar</Button>
                    </div>
                    </form>
                  )}
                  {show === "5" &&(
                    <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="pt-5">
                      <h1>Formulario Restaurantes</h1>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input 
                          className="max-w-xs" type="text" label="nombre" 
                          placeholder="Escribe el nombre del restaurante"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                            {errors.nombre && "este campo es obligatorio"}   

                        <Select
                          label="Municipio"
                          name="municipio"
                          placeholder="Selecciona un municipio"
                          className="max-w-sm"
                          {...register("municipio",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            <SelectItem key={"1"} value={"1"}>
                              Conkal
                            </SelectItem>
                            <SelectItem key={"2"} value={"2"}>
                              Acanceh
                            </SelectItem>
                            <SelectItem key={"3"} value={"3"}>
                              ChichenItza
                            </SelectItem>
                            <SelectItem key={"4"} value={"4"}>
                              Homun
                            </SelectItem>
                        </Select>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input name="direccion" className="max-w-xs" type="text" label="Direccion" placeholder="Escribe La Direccion" />
                    </div>

                    <div className="pt-5">
                      <Button color="success" type="submit"> Guardar</Button>
                    </div>
                    </form>
                  )}
                  {show === "6" &&(
                    <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="pt-5">
                      <h1>Formulario Localidades</h1>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input 
                          className="max-w-xs" type="text" label="nombre" 
                          placeholder="Escribe el nombre del restaurante"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                            {errors.nombre && "este campo es obligatorio"}   

                    </div>
                    <div className="pt-5">
                      <Button color="success" type="submit"> Guardar</Button>
                    </div>
                    </form>
                  )}
                  {show === "7" &&(
                    <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="pt-5">
                      <h1>Formulario Municipios</h1>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input 
                          className="max-w-xs" type="text" label="nombre" 
                          placeholder="Escribe el nombre del restaurante"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                            {errors.nombre && "este campo es obligatorio"}   

                        <Select
                          label="Municipio"
                          name="idLocalidad"
                          placeholder="Selecciona una localidad"
                          className="max-w-sm"
                          {...register("idLocalidad",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            <SelectItem key={"1"} value={"1"}>
                              Conkal
                            </SelectItem>
                            <SelectItem key={"2"} value={"2"}>
                              Acanceh
                            </SelectItem>
                            <SelectItem key={"3"} value={"3"}>
                              ChichenItza
                            </SelectItem>
                            <SelectItem key={"4"} value={"4"}>
                              Homun
                            </SelectItem>
                        </Select>
                    </div>


                    <div className="pt-5">
                      <Button color="success" type="submit"> Guardar</Button>
                    </div>
                    </form>
                  )}
                  {show === "9" &&(
                    <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="pt-5">
                      <h1>Formulario Paquetes</h1>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input 
                          className="max-w-xs" type="text" label="nombre" 
                          placeholder="Escribe el nombre del restaurante"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                            {errors.nombre && "este campo es obligatorio"}   
                    </div>

                    <div className="pt-5">
                      <Button color="success" type="submit"> Guardar</Button>
                    </div>
                    </form>
                  )}
            </CardBody>
        </Card>
    </div>

  );

}

export default FormularioServiciosComponent;