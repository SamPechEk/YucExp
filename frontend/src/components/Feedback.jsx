import React from 'react'
import Card from './Card'
import Slider from "react-slick";
import { courses } from '../data/Courses';
import FeedbackCard from './FeedbackCard';

const Feedback = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow:1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
    <div className='w-full dark:bg-[#1b263b] items-center py-10 px-10'>
        <div className='md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0'>
            <div className='py-4'>
              <h1 className='py-3 text-3xl font-bold'> <span className='text-[#DB5A42]'>Opiniones</span> del Cliente</h1>
              <p className='text-[#6D737A]'>...</p>
            </div>
            
            <Slider {...settings} >
            
                <FeedbackCard />
                <FeedbackCard />
                <FeedbackCard />



              

            </Slider>
            
        </div>

    </div>
  )
}

export default Feedback