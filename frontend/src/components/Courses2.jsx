import React from 'react'
import Card2 from './Card2'
import Slider from "react-slick";
import { rest2 } from '../data/rest2';

const Courses = () => {
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
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  };

  return (
    <div className='w-full dark:bg-[#0d1b2a] items-center  px-10'>
        <div className='md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0'>
            <div className='py-4'>
              <h1 className='py-3 text-3xl font-bold'>Restaurantes <span className='text-[#DB5A42]'>más</span> populares </h1>
            </div>
            
            <Slider {...settings} className='px-5'>
              {rest2.map((rest2,i)=>
                <div key={i}>
                  <Card2 rest2={rest2} />
                  <Card2 rest2={rest2} />
                  <Card2 rest2={rest2} />

                </div> ) }
              

            </Slider>
            
        </div>

    </div>
  )
}

export default Courses