'use client';
import { useAuth } from '@/context/AuthContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IUserObject {
  providerAccountId: string;
  email: string;
  name: string;
  accessToken: string;
  image: string;
}

export default function LoadingSessions() {
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const { setToken, setSession, userSession } = useAuth();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [hasFetched, setHasFetched] = useState(false); // Estado para controlar la petición

  useEffect(() => {
    // Redirigir si el estado del usuario es 'pending'
    if (userSession?.status === 'pending') {
      router.push('/formpage');
      return;
    }

    if (status === 'loading') return; // Espera a que se cargue la sesión

    // Asegurarse de que no se haya hecho la petición previamente
    if (status === 'authenticated' && session.user && !hasFetched) {
      const userObject: IUserObject = {
        providerAccountId: session.user.providerAccountId || '',
        email: session.user.email || '',
        name: session.user.name || '',
        accessToken: session.accessToken || '',
        image: session.user.image || '',
      };
      postUserSessionData(userObject);
      setHasFetched(true); // Marca que la petición ya se hizo
    } else if (status !== 'authenticated') {
      console.log('ERROR EN EL USE EFFECT DE CARGA DE SESION', session, status);
      alert('ERROR EN EL USE EFFECT DE CARGA DE SESION');
      router.push('/login');
    }
  }, [session, status, router, hasFetched]);

  const postUserSessionData = async (userObject: IUserObject) => {
    try {
      const response = await fetch(
        `http://localhost:${port}/auth/auth0/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userObject),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('ERROR EN LA RESPUESTA DEL SERVIDOR:', errorData);
        window.alert(
          'ERROR EN LA RESPUESTA DEL SERVIDOR: ' + errorData.message,
        );
        router.push('/login');
        return;
      }

      const data = await response.json();
      console.log(
        'RESULTADO DEL CONDICIONAL DE ESTADO DE USER, DATA.USER',
        data.user,
      );
      if (data.user.status === 'pending') {
        setSession(data.user);
        setToken(data.token);
        router.push('/formpage');
        return;
      }

      setSession(data.user);
      setToken(data.token);
      router.push('/');
      return;
    } catch (error) {
      console.error('Error al enviar los datos al backend:', error);
      window.alert('Error al enviar los datos al backend.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center w-60 h-60">
        {status ? (
          <div
            role="status"
            className="flex flex-col items-center justify-center"
          >
            <svg
              aria-hidden="true"
              className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
            <h1 className="text-2xl text-blue-500 mt-4">Cargando...</h1>
          </div>
        ) : (
          <div>formulario</div>
        )}
      </div>
    </div>
  );
}
