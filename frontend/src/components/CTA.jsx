import React from 'react'
import { Link } from 'react-router-dom'
import { cta } from '../assets'

const CTA = () => {
  return (
    <div className='w-full dark:bg-[#0d1b2a] items-center py-10 px-10'>
    <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-8 max-w-[600px] items-center  px-4 md:px-0'>
                
        <img src={cta} className="w-[650px] mx-auto" />

        
        <div>
            <h1 className='py-2  text-3xl font-semibold'>Unetenos, <span className='text-[#DB5A42]'>Conocenos</span> y guiate con tu instinto aventurero </h1>
            {/* <p className='py-2 text-lg text-gray-600'> ...    </p> */}
            {/* <Link to={`/Actividades`} reloadDocument>
            <button className='max-[780px]:w-full my-4 px-8 py-5 rounded-md bg-[#DB5A42] text-white font-bold'>
                Actividades
              </button></Link> */}

             
        </div>
        



    </div>
    

</div>
  )
}

export default CTA