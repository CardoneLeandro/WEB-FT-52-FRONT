'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
const port = process.env.NEXT_PUBLIC_APP_API_PORT;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleMenu = (menuName: string) => {
    setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };
  const { logout, token, userSession } = useAuth();
  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
    logout();
  };

  const router = useRouter();

  useEffect(() => {
    if (
      (userSession?.role !== 'superadmin' && userSession?.role !== 'admin') ||
      !token
    ) {
      router.push('/');
    }
  }, [userSession, token, router]);

  return (
    <div className="flex min-h-screen mb-20">
      <div className="w-64 flex flex-col border-e bg-white min-h-screen justify-between  p-4 mb-44">
        <Button variant={'default'}>
          <Link href="/">Volver a inicio</Link>
        </Button>
        <div className="flex-1 px-4 py-6">
          <span className="sr-only">Home</span>
          <div className="flex flex-row justify-center"></div>

          <ul className="mt-6 space-y-1">
            <Link href="/dashBoard-Admin">
              <li className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-700">
                PERFIL DEL ADMINISTRADOR
              </li>
            </Link>
            <li>
              <div>
                <button
                  onClick={() => toggleMenu('eventos')}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="text-sm font-medium"> Eventos </span>
                  <span
                    className={`transition duration-300 ${
                      activeMenu === 'eventos' ? '-rotate-180' : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {activeMenu === 'eventos' && (
                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        href="/dashBoard-Admin/events/editEvent"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Crear Eventos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashBoard-Admin/events/currentevents"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Ver y Editar Eventos
                      </Link>
                    </li>
                    <li></li>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div>
                <button
                  onClick={() => toggleMenu('donaciones')}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="text-sm font-medium"> Donaciones </span>
                  <span
                    className={`transition duration-300 ${
                      activeMenu === 'donaciones' ? '-rotate-180' : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {activeMenu === 'donaciones' && (
                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <Link
                        href="/dashBoard-Admin/donations"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Historial de donaciones
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div>
                <button
                  onClick={() => toggleMenu('usuarios')}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <span className="text-sm font-medium"> Usuarios </span>
                  <span
                    className={`transition duration-300 ${
                      activeMenu === 'usuarios' ? '-rotate-180' : ''
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
                {activeMenu === 'usuarios' && (
                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <a
                        href="/dashBoard-Admin/usercontrol"
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Agregar y eliminar usuarios
                      </a>
                    </li>
                    <li>                      
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>

        <div className="  flex flex-col gap-2 justify-center px-4 mb-10">
          <Button variant={'destructive'} onClick={() => handleLogOut()}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
