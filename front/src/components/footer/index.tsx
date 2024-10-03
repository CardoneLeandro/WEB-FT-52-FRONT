import React from 'react'
import { FaRegCopyright } from 'react-icons/fa'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FaYoutube } from 'react-icons/fa'

function Footer() {
  return (
    <div className='w-full mb-0 bg-blue-500 min-h-auto'>
      <div className=' container mx-auto flex flex-col  lg:flex-row justify-between items-center p-2 lg:px-8 bg-blue-500 text-gray-200'>
        <div className='mb-4 lg:mb-0'>
          <div className='flex flex-row gap-1 items-center text-sm'>
            <h1>Copyright</h1>
            <FaRegCopyright />
            <h1>2024</h1>
          </div>
          <h1 className='text-sm'>Desarrollado a modo de donación para</h1>
          <h1 className='text-sm mb-2'>Movimiento Juvenil Peregrinos</h1>
          <Link
            href='/team'
            className='text-md   font-bold hover:cursor-pointer  hover:underline  transition duration-300 ease-in-out mb-2'
          >
            Conoce al equipo desarrollador
          </Link>
        </div>
        <div className='flex flex-col'>
          <h2 className='font-bold'>Enlaces de interes:</h2>
          <Link href='/'>Sede Centro</Link>
          <Link href='/'>Sede Oeste</Link>
        </div>
        {/* redes sociales */}
        <div className=' mb-2 flex flex-col items-center lg:mb-0'>
          <h3 className='font-bold'>Nuestras Redes:</h3>
          <div className='flex flex-col gap-2 y-2 '>
            <div className='flex flex-row gap-2 items-center'>
              <Link href='https://www.instagram.com'>
                <FaInstagram className='w-10 ' />
              </Link>
              <Link href='https://www.facebook.com'>
                <FaFacebookSquare className='w-10 ' />
              </Link>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <Link href='https://www.x.com'>
                <FaXTwitter className='w-10 ' />
              </Link>
              <Link href='https://www.youtube.com'>
                <FaYoutube className='w-10' />
              </Link>
            </div>
          </div>
        </div>
        <div>
          {/* links de contacto */}
          <div className='flex flex-col '>
            <h3 className=' font-bold text-xl '>Contactanos:</h3>
            <div className='mt-2 flex flex-col sm:flex-row sm:gap-4'>
              <div className='flex flex-row items-center '>
                <div className='mt-2'>
                  <h2 className='font-bold'>Lugar de encuentro:</h2>
                  <h2 className='font-light'>Lorem ipsum dolor sit.</h2>
                </div>
              </div>
              <div className='flex flex-row items-center gap-2'>
                <div className='mt-2'>
                  <h2 className='font-bold'>Celular:</h2>
                  <h2 className='font-light'>000 000 0000</h2>
                </div>
              </div>
              <div className='mt-2 '>
                <div className='flex flex-col'>
                  <h2 className='font-bold'>Email:</h2>
                  <h2 className='font-light'>Email@email.com</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
