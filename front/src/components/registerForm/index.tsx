'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Interface para los datos de registro
interface IRegisterUser {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function FormRegister() {
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const { setToken, setSession } = useAuth();
  const router = useRouter();
  const [dataNewUser, setDataNewUser] = useState<IRegisterUser>({
    name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataNewUser({ ...dataNewUser, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validaciones
    if (!validateEmail(dataNewUser.email)) {
      newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
    }
    if (!validatePassword(dataNewUser.password)) {
      newErrors.password =
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número.';
    }
    if (dataNewUser.password !== dataNewUser.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:${port}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataNewUser),
      });

      const data = await response.json();
      console.log(
        'RESULTADO DEL CONDICIONAL DE ESTADO DE USER, DATA.USER',
        data.user,
      );
      if (response.ok) {
        window.alert('Registro exitoso');
        setSession(data.user);
        setToken(data.token);
        router.push('/login');
        return;
      }
    } catch (error) {
      console.error('Error al enviar los datos al backend:', error);
      window.alert('Error al enviar los datos al backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Descripción de la imagen"
            src="/image/logo-viejo-nuevo.jpg"
            layout="fill"
            objectFit="cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-md h-auto lg:w-[500px] lg:h-[350px] flex flex-col justify-center">
            <div>
              <h1 className="mt-6 text-2xl font-serif text-gray-900 sm:text-3xl md:text-4xl">
                Bienvenidos a Movimiento Juvenil Peregrino
              </h1>
            </div>
            <p className="mt-4 leading-relaxed text-gray-700 sm:text-2xl md:text-2xl">
              &quot; Reconociendonos testigos, ofrecemos nuestros dones a la
              iglesia. &quot;
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6 mb-10"
            >
              <div className="col-span-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={dataNewUser.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Ingrese su nombre"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={dataNewUser.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Ingrese su correo electrónico"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="adress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={dataNewUser.address}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Ingrese su dirección"
                  className="mt-1 w-full p-4  border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                  required
                />
                {errors.adress && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {errors.adress}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={dataNewUser.phone}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Ingrese su teléfono"
                  className="mt-1 w-full p-4  border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={dataNewUser.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Ingrese su contraseña"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                  required
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={dataNewUser.confirmPassword}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  placeholder="Confirma tu contraseña"
                  className="mt-1 w-full p-4  border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                  required
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring ${
                    loading ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 flex items-center">
                  ¿Ya tienes una cuenta?
                  <Link
                    href="/login"
                    className="text-gray-700 font-bold hover:underline hover:text-blue-500 ml-1 "
                  >
                    Inicia sesión
                  </Link>
                </p>
                <Link
                  href="/"
                  className="text-gray-700 font-bold hover:underline hover:text-blue-500 ml-1 "
                >
                  Ir a inicio
                </Link>
              </div>
            </form>

            {errors.general && (
              <p className="mt-4 text-sm text-red-600 opacity-75">
                {errors.general}
              </p>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

export default FormRegister;
