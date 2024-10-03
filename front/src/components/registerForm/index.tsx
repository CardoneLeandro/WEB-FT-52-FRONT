'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
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
  const [loading, setLoading] = useState(false);

  const formik = useFormik<IRegisterUser>({
    initialValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Por favor ingresa tu nombre')
        .min(2, 'El nombre debe tener al menos 2 caracteres.')
        .max(50, 'El nombre no puede exceder los 50 caracteres.'),
      email: Yup.string()
        .required('Por favor, ingresa tu correo.')
        .email('Asegúrate de ingresar un correo válido.'),
      address: Yup.string().required('Por favor, ingresa tu dirección.'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'El teléfono debe contener solo números.')
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
        .required('Por favor, ingresa tu número de teléfono.'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(
          /[A-Z]/,
          'Incluye al menos una letra mayúscula en tu contraseña.',
        )
        .matches(/[0-9]/, 'Incluye al menos un número en tu contraseña.')
        .required('Por favor, crea una contraseña.'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Confirma tu contraseña, por favor.'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://web-ft-52-back-1.onrender.com/auth/signup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          },
        );

        const data = await response.json();
        if (response.ok) {
          toast.success('Cuenta registrada exitosamente', {
            position: 'bottom-center',
          });
          setSession(data.user);
          setToken(data.token);
          router.push('/login');
        }
      } catch (error) {
        console.error('Error al enviar los datos al backend:', error);
        window.alert('Error al enviar los datos al backend.');
      } finally {
        setLoading(false);
      }
    },
  });

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
            <h1 className="mt-6 text-2xl font-serif text-gray-900 sm:text-3xl md:text-4xl">
              Bienvenidos a Movimiento Juvenil Peregrino
            </h1>
            <p className="mt-4 leading-relaxed text-gray-700 sm:text-2xl md:text-2xl">
              &quot;Reconociendonos testigos, ofrecemos nuestros dones a la
              iglesia.&quot;
            </p>

            <form
              onSubmit={formik.handleSubmit}
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
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese su nombre"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {formik.errors.name}
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese su correo electrónico"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese su dirección"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {formik.errors.address}
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
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese su teléfono"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {formik.errors.phone}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ingrese su contraseña"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-600 opacity-75">
                    {formik.errors.password}
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
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Confirme su contraseña"
                  className="mt-1 w-full p-4 border border-gray-300 bg-white text-sm text-gray-700 shadow-sm rounded-md"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 opacity-75">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mb-10">
                <Button
                  type="submit"
                  variant={'default'}
                  disabled={loading}
                  className=""
                >
                  {loading ? 'Registrando...' : 'Crear cuenta'}
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  ¿Ya tienes cuenta?
                  <Link href="/login" className="text-gray-700 underline pl-1">
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default FormRegister;
