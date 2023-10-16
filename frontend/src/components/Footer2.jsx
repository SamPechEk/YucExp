import React from 'react'
import { logo } from '../assets'
import {FaFacebookF,FaDribbble,FaLinkedinIn,FaInstagram,FaBehance} from 'react-icons/fa'

const Footer2 = () => {
  return (
    <div className='w-full bg-[#1b263b] py-24'>
        <div className='md:max-w-[1480px] m-auto grid md:grid-cols-5 max-[780px]:grid-cols-2  gap-8 max-w-[600px]  px-4 md:px-0'>
            
            <div className='col-span-2'>
                <img src={logo} className="h-[25px]" />
                <h3 className='text-2xl font-bold mt-10'>Contactanos</h3>
                <h3 className='py-2 text-[#6D737A]'>Tel: +52 9992 400 123</h3>
                <h3 className='py-2 text-[#6D737A]'>... <br></br>...</h3>
                <h3 className='py-2 text-[#363A3D]'>Email: example@mail.com</h3>
                <div className='flex gap-4 py-4'>
                        <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaFacebookF size={25} style={{color:'#c'}} /></div>
                        <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaDribbble size={25} style={{color:'#DB5A42'}} /></div>
                        <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaLinkedinIn size={25} style={{color:'#DB5A42'}} /></div>
                        <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaInstagram size={25} style={{color:'#DB5A42'}} /></div>
                        <div className='p-4 bg-[#E9F8F3] rounded-xl'><FaBehance size={25} style={{color:'#DB5A42'}} /></div>

                </div>

            </div>

            <div>
                <h3 className='text-2xl font-bold'>Explore</h3>
                <ul className='py-6 text-[#6D737A]'>
                    <li className='py-2'>Home</li>
                    <li className='py-2'>Sobre nosotros</li>
                    <li className='py-2'>Viajes</li>
                    <li className='py-2'>Transporte</li>
                    <li className='py-2'>Contacto</li>

                </ul>
            </div>

        

            <div className='max-[780px]:col-span-2'>
                <h3 className='text-2xl font-bold'>Registrate</h3>
                <h3 className='py-2 text-[#6D737A]'>...<br></br> ...</h3>
                <form className='py-4'>
                    <input 
                        className='bg-[#F2F3F4] p-4 w-full rounded' 
                        placeholder='Email here' 
                    />
                    <button className='max-[780px]:w-full my-4 px-5 py-3 rounded-md bg-[#DB5A42] text-white font-medium'>Reserva aqui</button>

                </form>


            </div>
        
        </div>
    </div>
  )
}

export default Footer2