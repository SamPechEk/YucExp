import React from 'react';
import { uber, aeromexico, ado } from '../assets';

const Companies = () => {
  return (
    <div className='w-full dark:bg-[#0d1b2a] items-center py-10 px-10'>
        <div className='md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0'>
            <h1 className='text-center text-2xl font-bold text-[#536E96] dark:text-white'>Nuestros colaboradores de transporte</h1>
            <p className='text-center  text-[#536E96] dark:text-white text-xl'>Companias que le ayudaran a disfrutar su viaje</p>
            <div className='flex justify-center py-8 md:gap-8 '>
                <div className='grid md:grid-cols-3 grid-cols-2 gap-2'>
                  <img src={uber} />
                  <img src={aeromexico} />
                  <img src={ado} />
                  
                </div>
            </div>
        
        </div>

    </div>
  )
}

export default Companies