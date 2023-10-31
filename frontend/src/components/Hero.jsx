import React from 'react';
import { heroImg } from '../assets';
import  {AiOutlineSearch} from 'react-icons/ai'

const Hero = () => {
  return (
    <div className='w-full dark:bg-[#0d1b2a] items-center py-10 px-10'>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 max-w-[600px]  px-4 md:px-0'>
            
            <div className='flex flex-col justify-start gap-4'>
                <p className='py-2 text-2xl  dark:text-[#DB5A42] font-medium'>Planificando experiencias</p>
                <h1 className='md:leading-[72px] py-2 md:text-6xl text-5xl font-semibold'>Accede a la información de <span className='text-[#DB5A42]'>+50</span> lugares
                    por conocer en todo el estado.
                </h1>
                <p className='py-2 text-lg text-gray-600'>...</p>
                
            </div>
            
            <img  src={heroImg} className="md:order-last  order-first" />



        </div>
        

    </div>
  )
}

export default Hero