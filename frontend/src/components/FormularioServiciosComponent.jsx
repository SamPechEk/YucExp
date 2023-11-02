import {Select, SelectItem} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import Swal from 'sweetalert2';
import React,{ useState, Component } from 'react';
import {Input} from "@nextui-org/react";
import axios from "axios";
import {useForm} from "react-hook-form";
import {Checkbox} from "@nextui-org/react";
const FormularioServiciosComponent = () =>
{


  const [datosSelect, setdatosSelect] = useState([]); //almacena los datos cargados de la base de datos, tiposervicio
  const [municipiosV, setMunicipios] = useState([]);

  React.useEffect(()=>{
    //obtiene los tipo de servicios para pintar el select
          axios.get('http://localhost:7000/obtener/servicios/getServicios')
          .then((response) => {
            
            if (!response.data.success) {
              Swal.fire(response.data.msg, '', 'danger')
              return;
            }
            if(!datosSelect.length > 0){//confirma que el arreglo aun no tenga datos, asi evita que se carguen de forma infinita
              setdatosSelect(response.data.msg);//le pasamos la respuesta del servidor con los datos
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(error.response.data.msg, '', 'error')
          });


          axios.get("http://localhost:7000/api/usuarios/municipios")
          .then((response) => {
            if(!municipiosV.length > 0){
              setMunicipios(response.data);
            }
          })
          .catch((error) => {
            console.error("Error al obtener municipios:", error);
          });
        },[])

          const [show, setShow] = useState('');// almacena el tipo de servicio que fue seleccionado
          const showContent = (event) => {
            // al modificar el valor del select llama a esta funcion para actualizar el formulario a mostrar
            var valor = event.target.value;
            setShow(valor);
        }

        const [EstSwitch, setEstSwitch] = useState(true);
        const {register, handleSubmit, formState:{ errors }} = useForm();//hook para formularios
        const onSubmit = (values) =>{//values es el arreglo que trae el useForm
          //esta funcion escucha cuando el formulario es enviado
          console.log(values);
          let foto = '';
          var tipoImg = '';
          if (EstSwitch == true && values.foto) {
            foto = values.foto[0];
            tipoImg = '1';
          }
          else{
            foto = values.foto;
            tipoImg = '2';
          }
          const formData = new FormData(); //instancia de datos que se va a mandar al axios
          formData.set('tipo',show);
          formData.set('nombre', values.nombre);
          formData.set('municipio', values.municipio);
          formData.set('calificacion', values.calificacion);
          formData.set('idLugar', values.idLugar);
          formData.set('direccion', values.direccion);
          formData.set('idTipoTransporte', values.idTipoTransporte);
          formData.set('foto', foto);
          formData.set('tipoImg', tipoImg);

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
                <div className="flex flex-col gap-2">
                  <Checkbox isSelected={EstSwitch} onValueChange={setEstSwitch}>
                  <p className="text-default-500">
                    Campo: {EstSwitch ? "Imagen" : "Link De Imagen"}
                  </p>
                  </Checkbox>
                </div>
                <div className="items-center pt-5">
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
                          <p className="text-red-700">{errors.nombre && "este campo es obligatorio"}</p>
                            

                          <Select
                            label="Selecciona El Municipio"
                            name="municipio"
                            placeholder="Selecciona un municipio"
                            className="max-w-sm"
                            {...register("municipio",{
                              required:"Required", message:'Este campo es obligatorio'})}
                          >
                              {municipiosV.map((mun) =>(
                                <SelectItem key={mun.idMunicipio} value={mun.idMunicipio}>
                                {mun.nombreMunicipio}
                              </SelectItem>
                              ))}
                          </Select>
                          <p className="text-red-700">{errors.municipio && "este campo es obligatorio"}</p>
                      </div>
                      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                      {EstSwitch ? 
                        <Input name="foto" 
                          {...register("foto",{
                              required:"Required", message:'Este campo es obligatorio'
                              })} 
                              className="max-w-xs" 
                              type="file" 
                              label="Selecciona Una Imagen" 
                              placeholder="Inserta una foto del Hotel" />
                        :
                        <Input
                      className="max-w-xs" type="text" label="foto" 
                        placeholder="Inserta el link de la foto"
                        name="foto"
                        {...register("foto",{
                          required:"Required", message:'Este campo es obligatorio'})}
                        />
                        
                      }
                        <p className="text-red-700">{errors.foto && "este campo es obligatorio"}</p>

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
                          <p className="text-red-700">{errors.calificacion && "este campo es obligatorio"}</p>
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
                          <p className="text-red-700">{errors.nombre && "este campo es obligatorio"}</p>

                        <Select
                          label="Municipio"
                          name="municipio"
                          placeholder="Selecciona un municipio"
                          className="max-w-sm"
                          {...register("municipio",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            {municipiosV.map((mun) =>(
                                <SelectItem key={mun.idMunicipio} value={mun.idMunicipio}>
                                {mun.nombreMunicipio}
                              </SelectItem>
                              ))}
                        </Select>
                        <p className="text-red-700">{errors.municipio && "este campo es obligatorio"}</p>
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
                        <p className="text-red-700">{errors.calificacion && "este campo es obligatorio"}</p>
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
                        <p className="text-red-700">{errors.idTipoTransporte && "este campo es obligatorio"}</p>
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
                          <p className="text-red-700">{errors.nombre && "este campo es obligatorio"}</p>

                        <Select
                          label="Municipio"
                          name="municipio"
                          placeholder="Selecciona un municipio"
                          className="max-w-sm"
                          {...register("municipio",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            {municipiosV.map((mun) =>(
                                <SelectItem key={mun.idMunicipio} value={mun.idMunicipio}>
                                {mun.nombreMunicipio}
                              </SelectItem>
                              ))}
                        </Select>
                        <p className="text-red-700">{errors.municipio && "este campo es obligatorio"}</p>
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        {EstSwitch ? 
                            <Input name="foto" 
                              {...register("foto",{
                                  required:"Required", message:'Este campo es obligatorio'
                                  })} 
                                  className="max-w-xs" 
                                  type="file" 
                                  label="Selecciona Una Imagen" 
                                  placeholder="Inserta una foto del Hotel" />
                            :
                            <Input
                          className="max-w-xs" type="text" label="foto" 
                            placeholder="Inserta el link de la foto"
                            name="foto"
                            {...register("foto",{
                              required:"Required", message:'Este campo es obligatorio'})}
                            />
                            
                          }       
                        <p className="text-red-700">{errors.foto && "este campo es obligatorio"}</p>
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
                          <p className="text-red-700">{errors.nombre && "este campo es obligatorio"}</p>
                        <Select
                          label="Municipio"
                          name="municipio"
                          placeholder="Selecciona un municipio"
                          className="max-w-sm"
                          {...register("municipio",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            {municipiosV.map((mun) =>(
                                <SelectItem key={mun.idMunicipio} value={mun.idMunicipio}>
                                {mun.nombreMunicipio}
                              </SelectItem>
                              ))}
                        </Select>
                        <p className="text-red-700">{errors.municipio && "este campo es obligatorio"}</p>
                    </div>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                      {EstSwitch ? 
                          <Input name="foto" 
                            {...register("foto",{
                                required:"Required", message:'Este campo es obligatorio'
                                })} 
                                className="max-w-xs" 
                                type="file" 
                                label="Selecciona Una Imagen" 
                                placeholder="Inserta una foto del Hotel" />
                          :
                          <Input
                        className="max-w-xs" type="text" label="foto" 
                          placeholder="Inserta el link de la foto"
                          name="foto"
                          {...register("foto",{
                            required:"Required", message:'Este campo es obligatorio'})}
                          />
                          
                        }
                        <p className="text-red-700">{errors.foto && "este campo es obligatorio"}</p>
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
                          <p className="text-red-700">{errors.nombre && "este campo es obligatorio"}</p>

                        <Select
                          label="Municipio"
                          name="municipio"
                          placeholder="Selecciona un municipio"
                          className="max-w-sm"
                          {...register("municipio",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                           {municipiosV.map((mun) =>(
                                <SelectItem key={mun.idMunicipio} value={mun.idMunicipio}>
                                {mun.nombreMunicipio}
                              </SelectItem>
                              ))}
                        </Select>
                        <p className="text-red-700">{errors.municipio && "este campo es obligatorio"}</p>
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 pt-5">
                        <Input name="direccion" className="max-w-xs" type="text" label="Direccion" placeholder="Escribe La Direccion" />
                        
                        {EstSwitch ? 
                        <Input name="foto" 
                          {...register("foto",{
                              required:"Required", message:'Este campo es obligatorio'
                              })} 
                              className="max-w-xs" 
                              type="file" 
                              label="Selecciona Una Imagen" 
                              placeholder="Inserta una foto del Hotel" />
                        :
                        <Input
                      className="max-w-xs" type="text" label="foto" 
                        placeholder="Inserta el link de la foto"
                        name="foto"
                        {...register("foto",{
                          required:"Required", message:'Este campo es obligatorio'})}
                        />
                        
                      }
                        <p className="text-red-700">{errors.foto && "este campo es obligatorio"}</p>
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
                          placeholder="Escribe el nombre de la localidad"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                          <p className="text-red-700">{errors.nombre && "este campo es obligatorio"}</p>

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
                          placeholder="Escribe el nombre del municipio"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                          <p className="text-red-700">{errors.nombre && "este campo es obligatorio"}</p>

                        <Select
                          label="Localidad"
                          name="idLocalidad"
                          placeholder="Selecciona una localidad"
                          className="max-w-sm"
                          {...register("idLocalidad",{
                            required:"Required", message:'Este campo es obligatorio'})}
                        >
                            <SelectItem key={"1"} value={"1"}>
                              Yucatan
                            </SelectItem>
                            <SelectItem key={"2"} value={"2"}>
                              Cancun
                            </SelectItem>
                            <SelectItem key={"3"} value={"3"}>
                              Cozumel
                            </SelectItem>
                            <SelectItem key={"4"} value={"4"}>
                              otro
                            </SelectItem>
                        </Select>
                        <p className="text-red-700">{errors.municipio && "este campo es obligatorio"}</p>
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
                          placeholder="Escribe el nombre del paquete"
                          name="nombre"
                          {...register("nombre",{
                            required:"Required", message:'Este campo es obligatorio'})}/>
                          <p className="text-red-700">{errors.nombre && "este campo es obligatorio"}</p>

                        {EstSwitch ? 
                          <Input name="foto" 
                            {...register("foto",{
                                required:"Required", message:'Este campo es obligatorio'
                                })} 
                                className="max-w-xs" 
                                type="file" 
                                label="Selecciona Una Imagen" 
                                placeholder="Inserta una foto " />
                          :
                          <Input
                        className="max-w-xs" type="text" label="foto" 
                          placeholder="Inserta el link de la foto"
                          name="foto"
                          {...register("foto",{
                            required:"Required", message:'Este campo es obligatorio'})}
                          />
                          
                        }
                        <p className="text-red-700">{errors.foto && "este campo es obligatorio"}</p>  
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