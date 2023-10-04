import React from 'react'
import { blogImg1 } from '../assets'
import StarRating from './StarRating'

const Card = ({course}) => {
  return (
    <div className='z-10 bg-[#0d1b2a] drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4'>
        <img src={course.linkImg} 
                className="h-40 w-full object-cover"
        
        />
        <div className='p-5 border border-b'>
            <h1 className='py-2 truncate dark:text-[#DB5A42]' >{course.title}</h1>
            <StarRating rating={course.rating}/>
        </div>
        <h3 className='p-5 text-xl dark:text-[#DB5A42]'>{course.price}</h3>

        <div className='absolute top-0 bg-white dark:bg-[#DB5A42]  m-3 px-2 py-[2.5px] rounded font-bold'>
            {course.category}
        </div>
    </div>
  )
}

export default Card