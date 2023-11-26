import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { Card, CardHeader, CardBody, Accordion, AccordionItem, Avatar,Button } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode.react';
import Vmenus from './Vmenus';

const ListadoComprasComponent = () => {
  const [carritos, setCompras] = useState([]);
  const [muni, setMuni] = useState("");
  const [mostrarBoton, setMostrarBoton] = useState(true);
  const { t } = useParams();
  // const { idUsuario } = useParams(); // Asegúrate de tener configurado React Router correctamente
  const token = localStorage.getItem('token');
  const pdf = (id) => {
    const divElement = document.getElementById(id);
    setMostrarBoton(false);
    const teme = () => {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
  
      return "light";
    };
  
   
    if (teme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
   
  
    setTimeout(() => {
      if (divElement) {
        
        html2canvas(divElement).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');

          const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const aspectRatio = imgProps.width / imgProps.height;
          const imgWidth = pdfWidth > imgProps.width ? imgProps.width : pdfWidth;
          const imgHeight = imgWidth / aspectRatio;

          const x = (pdfWidth - imgWidth) / 2;
          const y = (pdfHeight - imgHeight) / 2;

          pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
          pdf.save(`ticket-YucExp-#${id}.pdf`);
        });
        setTimeout(() => {
          if (teme === "dark") {
            document.querySelector("html").classList.remove("dark");
          } else {
            document.querySelector("html").classList.add("dark");
          }
          setMostrarBoton(true);
        }, 5000);
          
        
      }
    }, 2000);
    
    
  };

  useEffect(() => {
    // Hacer una solicitud GET al backend para obtener los items agregados
    axios.get(`http://localhost:7000/api/usuarios/historial2/car/${token}`)
      .then((response) => {
        setCompras(response.data.carritos); // Ajusta esto según la estructura de tu respuesta
        setMuni(response.data.municipio);
      })
      .catch((error) => {
        console.error('Error al obtener datos de itemcarrito:', error);
      });
  }, []);

  useEffect(() => {
    // Verifica si 't' tiene un valor

    // Lógica adicional que deseas ejecutar al inicio
    // ...
    if (t) {
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


  }, []);


  return (

    <div className="flex flex-col items-center py-10 px-10">
      <Card className="max-w-full max-h-full w-[600px] h-[900px]">
        <CardHeader className="flex flex-col content-center mr-4">
          <h1 className="text-large uppercase font-bold">Historial de servicios</h1>
        </CardHeader>
        <CardBody>
        {carritos  ?(
          <Accordion selectionMode="multiple">
            {carritos.map((carrito) => (
              <AccordionItem
                key={carrito.idcarrito}
                id={carrito.idcarrito}
                startContent={
                  <Avatar
                    size="lg"
                    src={carrito.items[0].detallesServicio.img} // Ajusta la ruta de la imagen según la estructura de tu respuesta
                  />
                }
                title={`${carrito.municipio} - Carrito #${carrito.idcarrito} - Donativo: $${carrito.donativo}`}
                subtitle={`Fecha de creación: ${new Date(carrito.fechaCreacion).toLocaleDateString()}`}
              >
                <div className="max-w-md">
                  <ul>
                    {carrito.items.map((item) => (
                      <li key={item.iditem}>
                        <p>{item.detallesServicio.nombre} - Categoria: {item.idTipoServicio}</p>
                        
                        {/* Agrega más detalles si es necesario */}
                      </li>
                      
                    ))}
                  </ul>
                  <Divider></Divider>
                  <br />
                  <QRCode value={`${carrito.municipio} - Carrito #${carrito.idcarrito} - Donativo: $${carrito.donativo} Fecha de creación: ${new Date(carrito.fechaCreacion).toLocaleDateString()}`} />
                  <br />
                  {mostrarBoton &&
                  <Button  id="btnReporte" color="success" onClick={() => pdf(carrito.idcarrito)}>
                    Reporte
                  </Button>
                  }
                </div>
              </AccordionItem>
              
            ))}
           
          </Accordion>
           ):(
            <>
            <Card isFooterBlurred className="w-full  col-span-12 sm:col-span-4">
              <h1 className="text-large uppercase font-bold">Sin elementos en el carrito</h1>
              <Vmenus></Vmenus>
              </Card>
            </>
          )} 
        </CardBody>


      </Card>
    </div>
  );
};

export default ListadoComprasComponent;
