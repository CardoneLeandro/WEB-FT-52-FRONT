'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { validateLoginForm } from './validateFormLogin';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
interface ILoginUser {
  email: string;
  password: string;
}

interface ILoginError {
  email?: string;
  password?: string;
}

function LoginForm() {
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const route = useRouter();

  const { setToken, setSession, userSession } = useAuth();
  const [loginUser, setLoginUser] = useState<ILoginUser>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ILoginError>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateLoginForm(loginUser);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Formulario válido. Enviando datos...');

      try {
        const response = await fetch(
          `http://localhost:${port}/users/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginUser),
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error('ERROR EN LA RESPUESTA DEL SERVIDOR:', errorData);
          toast.error('Ups mail o contraseña no validos intentalo de nuevo');
          route.push('/login');
          return;
        }

        const data = await response.json();

        if (data.redirect === true) {
          toast.success(
            'Te invitamos a rellenar un formulario para completar tu resgistro!',
          );
          handleClickGoogle();
          return;
        }

        setSession(data.user);
        setToken(data.token);
        toast.success(`Bienvenido ${userSession?.name}!`);
        route.push('/');
        return;
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        toast.error('Error en el inicio de sesión intentalo mas tarde');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleClickGoogle = async () => {
    try {
      await signIn('google', { callbackUrl: '/loadingsession' });
    } catch (error) {
      console.error('Error en signIn con Google', error);
    }
  };

  return (
    <div className="flex flex-row w-[100vw] h-screen wap-4 bg-white">
      <div className="w-[50vw] max-w-[50vw] h-3/4 flex flex-col m-auto items-center justify-between ">
        <div className="w-[10%] h-[13%] max-w-[50%] max-h-[13%] ">
          {' '}
          <Image
            alt="Descripción de la imagen"
            src="/image/Logo.png"
            width={75}
            height={50}
            className="mx-auto w-full h-full"
          />{' '}
        </div>

        <div className="flex flex-col items-center w-full">
          <h1 className="mt-6 text-2xl font-serif  sm:text-3xl md:text-4xl mx-auto text-center">
            Bienvenidos a Movimiento Juvenil Peregrino
          </h1>
          <p className="mt-4 leading-relaxed sm:text-2xl md:text-2xl text-center">
            &quot;Reconociéndonos testigos, ofrecemos nuestros dones a la
            iglesia.&quot;
          </p>
        </div>

        <div className="flex flex-col items-center w-3/4">
          <form
            className="mt-4 flex flex-col gap-4 w-full h-auto "
            onSubmit={handleSubmit}
          >
            <div className="col-span-4 w-full">
              <label htmlFor="Email" className="block text-sm font-medium ">
                Correo
              </label>

              <input
                type="email"
                id="Email"
                name="email"
                value={loginUser.email}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, email: e.target.value })
                }
                className={`mt-1 w-full p-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-400 rounded-sm'
                } bg-white text-sm text-gray-400 shadow-sm`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="col-span-4">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="Password"
                name="password"
                value={loginUser.password}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, password: e.target.value })
                }
                className={`mt-1 w-full p-3 border ${
                  errors.password
                    ? 'border-red-500'
                    : 'border-gray-400 rounded-sm'
                } bg-white text-sm text-gray-400 shadow-sm mb-4`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </form>

          <div className="flex flex-row  mt-2 gap-4 w-[90%] items-center">
            <Button
              onClick={handleSubmit}
              type="submit"
              className="inline-block w-full max-w-xs"
              variant={'outline'}
            >
              Ingresar
            </Button>
            <button
              onClick={handleClickGoogle}
              type="button"
              className="flex items-center justify-center h-10 w-full max-w-xs px-2 py-3 border border-blue-500 rounded-md shadow-sm bg-white hover:bg-blue-100 focus:border-blue-600 transition duration-300 ease-in-out"
            >
              <FcGoogle className="w-8 h-8" />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Continuar con Google
              </span>
            </button>
          </div>

          <div className="flex flex-col items-center my-4 gap-2">
            <p className=" text-sm text-gray-500 ">
              No tienes una cuenta? Puedes registrarte
              <Link
                href={'/register'}
                className="text-blue-500 font-bold hover:underline hover:text-blue-600 ml-1 "
              >
                Aquí
              </Link>
              .
            </p>
            <Link
              href="/"
              className="text-gray-700 font-bold hover:underline hover:text-blue-500 ml-1 "
            >
              Ir a inicio
            </Link>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full">
        <img
          alt="Descripción de la imagen"
          src="/image/logo-viejo-nuevo.jpg"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default LoginForm;
