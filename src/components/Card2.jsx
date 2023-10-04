import React from 'react'
import { blogImg1 } from '../assets'
import StarRating from './StarRating'

const Card2 = ({rest2}) => {
  return (
    <div className='z-10 bg-[#0d1b2a] drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4'>
        <img src={rest2.linkImg} 
                className="h-40 w-full object-cover"
        
        />
        <div className='p-5 border border-b'>
            <h1 className='py-2 truncate'>{rest2.title}</h1>
            <StarRating rating={rest2.rating}/>
        </div>
        <h3 className='p-5 text-xl'>{rest2.price}</h3>

        <div className='absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
            {rest2.category}
        </div>
    </div>
  )
}

export default Card2