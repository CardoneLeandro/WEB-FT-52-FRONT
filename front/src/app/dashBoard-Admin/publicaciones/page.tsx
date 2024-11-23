'use client';

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

export default function CrearPublicacion() {
  const { userSession } = useAuth();
  const [previewData, setPreviewData] = useState({
    autorNombre: '',
    autorAvatar: '',
    fecha: new Date().toLocaleString(),
    contenido: '',
  });

  const formik = useFormik({
    initialValues: {
      contenido: '',
    },
    validationSchema: Yup.object({
      contenido: Yup.string()
        .required('Por favor ingresa el contenido de la publicación.')
        .min(10, 'El contenido debe tener al menos 10 caracteres.')
        .max(500, 'El contenido no puede exceder los 500 caracteres.'),
    }),
    onSubmit: async (values) => {
      // aca logica para conectar con el back
      console.log('Publicación creada:', {
        ...values,
        autorNombre: userSession?.name,
        autorAvatar: userSession?.image,
      });
      toast.success('La publicación se ha creado exitosamente', {
        position: 'bottom-center',
      });
      formik.resetForm();
      setPreviewData((prev) => ({
        ...prev,
        contenido: '',
        fecha: new Date().toLocaleString(),
      }));
    },
  });

  useEffect(() => {
    if (userSession) {
      setPreviewData((prev) => ({
        ...prev,
        autorNombre: userSession.name || '',
        autorAvatar:
          userSession.avatar || '/placeholder.svg?height=40&width=40',
      }));
    }
  }, [userSession]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    formik.handleChange(e);
    setPreviewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      fecha: new Date().toLocaleString(),
    }));
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h1 className="font-bold text-2xl text-gray-700 mb-4">
        Crear Publicación
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <Textarea
            name="contenido"
            placeholder="Contenido de la publicación"
            onChange={handleInputChange}
            value={formik.values.contenido}
            className="bg-white"
            rows={4}
          />
          {formik.touched.contenido && formik.errors.contenido && (
            <div className="text-red-500 text-sm">
              {formik.errors.contenido}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="default">
            Crear Publicación
          </Button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="font-bold text-xl text-gray-700 mb-4">
          Previsualización:
        </h2>
        <Card className="max-w-lg mx-auto">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage
                src={previewData.autorAvatar}
                alt={previewData.autorNombre}
              />
              <AvatarFallback>
                {previewData.autorNombre.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">
                {previewData.autorNombre || 'Nombre del Autor'}
              </span>
              <span className="text-sm text-muted-foreground">
                {previewData.fecha}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {previewData.contenido || 'Contenido de la publicación'}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="flex items-center gap-2">
              <ThumbsUp size={20} />
              Me gusta
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
