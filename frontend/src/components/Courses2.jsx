import React, { useEffect, useState } from 'react';
import Card2 from './Card2';
import Slider from 'react-slick';
import axios from 'axios';


const Courses = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos obtenidos
  const storedMunicipio = localStorage.getItem("selectedMunicipio");

  useEffect(() => {
    // Realiza la solicitud para obtener los datos del servidor
    axios.get(`http://localhost:7000/api/usuarios/Services/${storedMunicipio}`)
      .then((response) => {
        setData(response.data);
        // console.log(data);
      })
      .catch((error) => {
        console.error('Error al obtener todos servicios:', error);
      });
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full dark:bg-[#0d1b2a] items-center px-10">
      <div className="md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0">
        <div className="py-4">
          <h2 className="py-3 text-3xl font-bold">
            Todos <span className="text-[#DB5A42]">los</span> servicios
          </h2>
        </div>

        <Slider {...settings} className="px-5">
          {data &&
            Object.entries(data).map(([category, items], i) => (
              <div className="dark:text-[#0d1b2a]" key={i}>
                <h2 className="dark:text-white">{category}</h2>
                
                {items.map((item, j) => (
                  
                  <Card2 key={j} rest2={item} />
                ))}
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Courses;
