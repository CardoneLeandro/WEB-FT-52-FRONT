import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
function DropDownMenu() {
  const { data: session } = useSession();
  const { token, userSession } = useAuth();
  const { logout } = useAuth();

  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
    logout();
  };

  return (
    <div className="absolute p-4 flex flex-col top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      {!userSession && !token && !session ? (
        <Link
          href="/login"
          className="px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-300 curor-pointer"
        >
          Iniciar sesión
        </Link>
      ) : (
        <>
          <Link
            href="/dashBoard"
            className="px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-300"
          >
            Mi perfil
          </Link>
          <Link
            href="/dashBoard-Admin"
            className="px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-300"
          >
            Panel Administrador
          </Link>
          <div
            onClick={() => handleLogOut()}
            className="px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-300 cursor-pointer"
          >
            Cerrar sesión
          </div>
        </>
      )}
    </div>
  );
}

export default DropDownMenu;
