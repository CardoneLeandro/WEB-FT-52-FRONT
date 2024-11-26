'use client';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Textarea } from '../ui/textarea';


export default function CreatePost ({
  title,
  content,
  setTitle,
  setContent,
}:{title: string, content: string, setTitle: (title: string) => void, setContent: (content: string) => void}) {
  
  const { setEvent, token, userSession, logout } = useAuth();
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const formik = useFormik({
    initialValues: {
      title,
      content,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Por favor ingresa un nombre para el evento.')
        .min(4, 'El nombre debe tener al menos 4 caracteres.')
        .max(50, 'El nombre no puede exceder los 50 caracteres.'),
      content: Yup.string().required(
        'Por favor ingresa una descripción para el evento.',
      ),
    }),
    onSubmit: async (values) => {
      const creatorId = userSession?.creatorId;
      const { title, content } = values;

      if (!title || !content) {
        toast.error('Todos los campos son obligatorios.', {
          position: 'bottom-center',
        });
        return;
      }

      if (!creatorId) {
        toast.error('Se requiere autenticación para publicar un anuncio.', {
          position: 'bottom-center',
        });
        return;
      }

      const postData = {
        title,
        content,
        creator: creatorId,
      };

      try {
        const response = await fetch(
          `http://localhost:${port}/auth/post/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
          },
        );

        //isBanned(response.status)? "una cosa" : "y sino otra";
        if (response.status === 441) {
          toast.error(
            `Su cuenta ah sido suspendida, por favor contactarse con nosotros via Email`,
          );
          logout();
          signOut({ callbackUrl: '/' });
        }

        if (response.ok) {
          const data = await response.json();
          setEvent(data);
          toast.success('El anuncio se ha publicado exitosamente', {
            position: 'bottom-center',
          });
        } else {
          toast.error('Error al publicar el anuncio', {
            position: 'bottom-center',
          });
        }
      } catch (error) {
        toast.error('Ha ocurrido un error al publicar el anuncio', {
          position: 'bottom-center',
        });
        console.error('error', error);
      }
    },
  });

  useEffect(() => {
    setTitle(formik.values.title);
    setContent(formik.values.content);
  }, [formik.values.title, formik.values.content]);

  return (
    <div className="  p-4 space-y-4">
      <form onSubmit={formik.handleSubmit} className="flex flex-row gap-8  ">
        <div className="w-1/2 flex flex-col ml-2 ">
          <h1 className="font-bold text-[28px] text-gray-500 ">
            Publicar Anuncio:
          </h1>
          <div className="flex flex-col gap-2 mt-4">
            <Input
              {...formik.getFieldProps('title')}
              type="text"
              placeholder="Titulo del Anuncio"
              className="bg-white w-[90%]"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}

            <Textarea
              {...formik.getFieldProps('content')}
              placeholder="Contenido del Anuncio"
              className="bg-white w-[90%]"
            />
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500">{formik.errors.content}</div>
            )}
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-start">
          <h2 className="font-bold text-[24px] text-gray-500 mt-1 mb-4 ml-5">
            Previsualización:
          </h2>

          <div
            className="relative flex flex-col w-[600px] h-[250px] py-4 gap-4 m-auto border rounded-lg shadow-md 
          "
          >
            <div className="font-bold text-2xl ml-5 h-1/6 ">
              {formik.values.title || 'Nombre del evento'}
            </div>

            <div className="text-lg ml-8 h-4/6">
              {formik.values.content ||
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque mollitia in sapiente eveniet veritatis libero excepturi voluptas sed blanditiis est non quis facere, qui harum repellat quidem suscipit similique facilis.'}
            </div>

            <div className="relative flex w-full gap-2 justify-end items-center px-4 h-1/6">
              <div className="text-sm mb-0">publicado por:</div>
              <div className="text-md">{userSession?.name}</div>
            </div>
          </div>
        </div>
      </form>

      <div className="flex justify-end gap-2 mr-5">
        <Button
          type="button"
          onClick={() => formik.resetForm()}
          variant={'destructive'}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          onClick={() => formik.handleSubmit()}
          variant='constructive'
        >
          Publicar
        </Button>
      </div>
    </div>
  );
};
