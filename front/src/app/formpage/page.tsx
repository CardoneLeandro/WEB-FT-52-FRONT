'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
function SignupForm() {
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const router = useRouter();
  const { userSession, setSession, setToken , token } = useAuth();

  const { data: session } = useSession();

  useEffect(() => {
    console.log(
      'USEEFFECT, userSession ==========================>',
      userSession,
    );
    if (!userSession) {
      router.push('/login');
      return;
    }
  }, [userSession]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Tu contraseña debe tener al menos 8 caracteres.')
        .matches(
          /[A-Z]/,
          'Agrega al menos una letra mayúscula en tu contraseña.',
        )
        .matches(/[0-9]/, 'Incluye al menos un número en tu contraseña.')
        .required('No olvides confirmar tu contraseña.'),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          'Las contraseñas no coinciden, verifica nuevamente.',
        )
        .required('Debe confirmar su contraseña'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'El teléfono debe contener solo números')
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
        .required('Por favor, ingresa tu número de teléfono.'),
      address: Yup.string().required('Por favor, ingresa tu dirección.'),
    }),

    onSubmit: async (values) => {
      try {
        const formData = {
          providerAccountId: session?.user.providerAccountId,
          email: userSession?.email,
          ...values,
        };
        console.log('FORMDATA =================================>:', formData);
        const response = await fetch(
          `http://localhost:${port}/users/auth0/completeregister`,
          
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          },
        );

        if (response.ok) {
          const data = await response.json();
          setSession(data.user);
          setToken(data.token);
          toast.success('Te has registrado exitosamente', {
            position: 'bottom-center',
          });
          router.push('/');
          return;
        } else {
          alert('Error en el registro');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error en el registro', {
          position: 'bottom-center',
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4 text-center">
          <div className="mb-4  flex justify-center mx-auto">
            <Avatar className="hover:cursor-pointer w-20 h-20">
              <AvatarImage src={userSession?.image || ''} alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-2xl font-bold text-blue-600 ">
            Bienvenido, {userSession?.name}!
          </h2>
          <p className="text-gray-600">
            Por favor, completa tu información para finalizar el registro.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label
              className="block text-blue-600 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="**********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label
              className="block text-blue-600 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="**********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className="mb-2">
            <label
              className="block text-blue-600 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Teléfono
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Teléfono"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              className="block text-blue-600 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Dirección
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="address"
              id="address"
              placeholder="Dirección"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.address}
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full" variant={'default'}>
              Completar Registro
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
