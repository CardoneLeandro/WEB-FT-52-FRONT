'use client';
import React, { useEffect } from 'react';
import { FaRegUserCircle, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import DropDownMenu from '../dropDownMenu';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function NavBar() {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const { userSession, token } = useAuth();

  const handleDropDownMenu = () => {
    setDropDownMenu(!dropDownMenu);
  };

  useEffect(() => {}, [token]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8 mt-2">
        <div className="flex flex-row items-center">
          <div className="p-2 flex flex-row items-center gap-2 rounded-md cursor-default">
            <img src="/mjp1.png" alt="img mjp" className="w-[45px] h-[45px]" />
            <div className="flex flex-col">
              <h2 className="font-bold text-blue-500">MOVIMIENTO</h2>
              <h2 className="font-bold text-blue-500">JUVENIL PEREGRINOS</h2>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-row gap-2 items-center">
          <Link
            onClick={() => setDropDownMenu(false)}
            href="/"
            className="hover:cursor-pointer hover:bg-gray-200 font-bold text-blue-500 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out"
          >
            Inicio
          </Link>
          <Link
            onClick={() => setDropDownMenu(false)}
            href="/eventsPage"
            className="hover:cursor-pointer hover:bg-gray-200 font-bold text-blue-500 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out"
          >
            Eventos
          </Link>

          <Link
            onClick={(event) => {
              if (!token) {
                event.preventDefault();
              } else {
                setDropDownMenu(false);
              }
            }}
            onMouseEnter={(event) => {
              if (!token) {
                setAlert(true);
              } else {
                event.preventDefault();
              }
            }}
            onMouseLeave={(event) => {
              if (!token) {
                setAlert(false);
              } else {
                event.preventDefault();
              }
            }}

            href={token ? '/post' : '#'}
            aria-disabled={token ? 'false' : 'true'}
            className={
              token
                ? 'font-bold text-blue-500 hover:cursor-pointer hover:bg-gray-200 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out'
                : 'font-bold text-slate-400 p-2 rounded-md transition duration-300 ease-in-out hover:cursor-default'
            }
          >
            Anuncios
          </Link>

          <Link
             onClick={(event) => {
              if (!token) {
                event.preventDefault();
              } else {
                setDropDownMenu(false);
              }
            }}
            onMouseEnter={(event) => {
              if (!token) {
                setAlert(true);
              } else {
                event.preventDefault();
              }
            }}
            onMouseLeave={(event) => {
              if (!token) {
                setAlert(false);
              } else {
                event.preventDefault();
              }
            }}
            href={token ? '/donations' : '#'}
            aria-disabled={token ? 'false' : 'true'}
            className={
              token
                ? 'font-bold text-blue-500 hover:cursor-pointer hover:bg-gray-200 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out'
                : 'font-bold text-slate-400 p-2 rounded-md transition duration-300 ease-in-out hover:cursor-default'
            }
          >
            Donaciones
          </Link>

          <Link
            onClick={() => setDropDownMenu(false)}
            href="/aboutUs"
            className="hover:cursor-pointer hover:bg-gray-200 font-bold text-blue-500 hover:text-blue-600 p-2 rounded-md transition duration-300 ease-in-out"
          >
            Nuestra comunidad
          </Link>

          <div className="relative">
            {(userSession?.image && (
              <Avatar className="hover:cursor-pointer">
                <AvatarImage
                  src={userSession?.image}
                  onClick={handleDropDownMenu}
                />
                <AvatarFallback onClick={handleDropDownMenu}>CN</AvatarFallback>
              </Avatar>
            )) || (
              <FaRegUserCircle
                className="w-[38px] h-[38px] p-1 text-gray-400 bg-gray-200 rounded-full hover:cursor-pointer hover:text-blue-500 transform hover:scale-110 transition duration-300 ease-in-out"
                onClick={handleDropDownMenu}
              />
            )}

            {dropDownMenu && <DropDownMenu />}
          </div>
        </div>

        <div className="lg:hidden">
          <FaBars
            className="w-6 h-6 text-gray-500 cursor-pointer hover:text-blue-500 transform hover:scale-110 transition duration-300 ease-in-out"
            onClick={handleMenuToggle}
          />
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white w-full py-2 px-4">
          <Link
            href="/"
            className="block py-2 hover:bg-gray-200 text-blue-500 font-light rounded-md transition duration-300 ease-in-out"
          >
            Inicio
          </Link>
          <Link
            href="/aboutUs"
            className="block py-2 hover:bg-gray-200 text-blue-500 font-light rounded-md transition duration-300 ease-in-out"
          >
            Nuestra comunidad
          </Link>
          <Link
            href="/donations"
            className="block py-2 hover:bg-gray-200 text-blue-500 font-light rounded-md transition duration-300 ease-in-out"
          >
            Donaciones
          </Link>
          <Link
            href="/events"
            className="block py-2 hover:bg-gray-200 text-blue-500 font-light rounded-md transition duration-300 ease-in-out"
          >
            Eventos
          </Link>
        </div>
      )}
      <div className="absolute flex align-center w-full justify-center">
        {alert && (
          <span className="font-bold text-lg text-red-500">
            Es necesario iniciar sesión
          </span>
        )}
      </div>
    </div>
  );
}

export default NavBar;
