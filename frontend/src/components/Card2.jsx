import React from 'react'
import { blogImg1 } from '../assets'
import StarRating from './StarRating'

const Card2 = ({rest2}) => {
  // console.log(rest2);
  return (
    <div className='z-10 dark:bg-[#0d1b2a] drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4'>
        <img src={rest2.img} 
                className="h-40 w-full object-cover"
        
        />
        <div className='p-5 border border-b'>
            <h1 className='py-2 dark:text-white truncate'>{rest2.nombre}</h1>
            {/* <StarRating rating={rest2.rating}/> */}
        </div>
        {/* <h3 className='p-5 text-xl'>{rest2.price}</h3> */}

        <div className='absolute top-0 dark:bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
            {''}
        </div>
    </div>
  )
}

export default Card2