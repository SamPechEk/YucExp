import React from 'react'
import { avatar, quotationMark } from '../assets'

const FeedbackCard = () => {
  return (
    <div className='bg-[#0d1b2a] p-8 rounded-3xl shadow-xl my-8 mx-2'>
      <div className='flex justify-between'>
        <div className='flex gap-4'>
                <img src={avatar} />
                <div>
                    <h1 className='dark:text-white'>Guadalupe Garcia</h1>
                </div>
            
            </div>
            <img className='h-8' src={quotationMark} />
      </div>

      <div className='py-8'>
        <h3 className='text-lg dark:text-white'>¡Mi familia y yo tuvimos una experiencia increíble usando la página de viajes y transporte en Yucatán! Desde el momento en que llegamos al aeropuerto de Mérida, todo fue perfecto. El servicio de traslado al hotel fue puntual y cómodo, y el conductor fue muy amable y conocedor de la zona.
                                Además, utilizamos la página para reservar nuestras excursiones a Chichén Itzá y Uxmal, y ambas fueron memorables. Los guías turísticos fueron apasionados y compartieron información fascinante sobre la historia y la cultura de la región. También utilizamos la página para encontrar restaurantes locales recomendados, lo que hizo que nuestras comidas fueran aún más deliciosas.
                                En resumen, si planeas visitar Yucatán, esta página de viajes y transporte es una herramienta imprescindible. Nos hizo sentir seguros y bien cuidados durante toda nuestra estadía.</h3>
      </div>
    </div>
  )
}

export default FeedbackCard