import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePickerDemo } from './datePicker';
import { Input } from '@/components/ui/input';
import { InputFile } from './inputFile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import IInputEventAdProps from '@/interfaces/IInputEventAdProps';
import toast from 'react-hot-toast';
import GoogleMap from '../GoogleMaps';

function InputEventAd() {
  const { token, userSession } = useAuth();
  const [image, setImage] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(false);

  const port = process.env.NEXT_PUBLIC_APP_API_PORT;

  const formik = useFormik<IInputEventAdProps>({
    initialValues: {
      title: '',
      eventDate: '',
      eventLocation: '',
      description: '',
      price: 0,
      stock: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Por favor ingresa un nombre para el evento.')
        .min(4, 'El nombre debe tener al menos 4 caracteres.')
        .max(50, 'El nombre no puede exceder los 50 caracteres.'),
      eventDate: Yup.string().required('Por favor ingresa una fecha.'),
      eventLocation: Yup.string().required('Por favor ingresa una ubicación.'),
      description: Yup.string().required(
        'Por favor ingresa una descripción para el evento.',
      ),
      price: Yup.number().required('Por favor ingresa el costo de la entrada.'),
      stock: Yup.number().required('¿Cuantas personas pueden asistir?'),
    }),
    onSubmit: async (values) => {
      const creatorId = userSession?.creatorId;

      if (!creatorId) {
        toast.error('Se requiere autenticación para crear un evento.', {
          position: 'bottom-center',
        });
        return;
      }

      const cleanedDateString = values.eventDate.replace(
        /(\d+)(th|st|nd|rd)/,
        '$1',
      );
      const eventDateConverted = new Date(cleanedDateString);

      const eventData = {
        ...values,
        eventDate: eventDateConverted,
        images: [image],
        creator: creatorId,
      };

      try {
        const response = await fetch(`http://localhost:${port}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        });

        if (response.status === 201) {
          toast.success('El evento se ha creado exitosamente', {
            position: 'bottom-center',
          });
        } else {
          toast.error('Error al crear el evento', {
            position: 'bottom-center',
          });
        }
      } catch (error) {
        toast.error('Ha ocurrido un error al crear el evento', {
          position: 'bottom-center',
        });
        window.console.error('error', error);
      }
    },
  });

  useEffect(() => {
    console.log('useEffect ejecutado con userSession:', userSession);
  }, [userSession, token]);

  const toggleMap = () => {
    setShowMap(true);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-bold text-[28px] text-gray-500 mb-4">
        Crear evento:
      </h1>

      <form onSubmit={formik.handleSubmit} className="flex flex-row gap-8">
        <div className="w-1/2">
          <div className="flex flex-col gap-4">
            <Input
              {...formik.getFieldProps('title')}
              type="text"
              placeholder="Nombre del evento"
              className="bg-white"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}

            <DatePickerDemo
              onChange={(date: string) =>
                formik.setFieldValue('eventDate', date)
              }
            />
            {formik.touched.eventDate && formik.errors.eventDate && (
              <div className="text-red-500">{formik.errors.eventDate}</div>
            )}

            <div className="flex items-center gap-2">
              <Input
                {...formik.getFieldProps('eventLocation')}
                type="text"
                placeholder="Ubicación"
                className="bg-white flex-grow"
              />
              <Button
                type="button"
                onClick={toggleMap}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Buscar Ubicación
              </Button>
            </div>
            {formik.touched.eventLocation && formik.errors.eventLocation && (
              <div className="text-red-500">{formik.errors.eventLocation}</div>
            )}

            <Input
              {...formik.getFieldProps('description')}
              type="text"
              placeholder="Descripción del evento"
              className="bg-white"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}
            <h1 className="text-gray-600">Costo de entrada al evento:</h1>
            <Input
              {...formik.getFieldProps('price')}
              type="number"
              placeholder="Costo del evento"
              className="bg-white"
            />
            {formik.touched.price && formik.errors.price && (
              <div className="text-red-500">{formik.errors.price}</div>
            )}

            <Input
              {...formik.getFieldProps('stock')}
              type="number"
              placeholder="Capacidad de asistentes"
              className="bg-white"
            />
            {formik.touched.stock && formik.errors.stock && (
              <div className="text-red-500">{formik.errors.stock}</div>
            )}

            <InputFile
              onImageUpload={(imageUrl: string) => {
                setImage(imageUrl);
              }}
            />

            {showMap && (
              <div className="mt-4 w-full items-start">
                <GoogleMap
                  setEventLocation={(location: string) =>
                    formik.setFieldValue('eventLocation', location)
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-start">
          <h2 className="font-bold text-[24px] text-gray-500 mb-2">
            Previsualización:
          </h2>
          <div className="border p-4 rounded-lg shadow-lg max-w-sm">
            <img
              src={image || 'https://via.placeholder.com/400'}
              alt={formik.values.title}
              className="w-full h-48 object-contain rounded-lg"
            />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">
                {formik.values.title || 'Nombre del evento'}
              </h2>
              <p className="text-gray-700">
                {formik.values.eventDate || 'Fecha no definida'}
              </p>
              <p className="text-gray-700">
                {formik.values.eventLocation || 'Ubicación no definida'}
              </p>
              <p className="text-gray-600 mt-2">
                {formik.values.description || 'Descripción no disponible'}
              </p>
            </div>
          </div>
        </div>
      </form>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={() => formik.resetForm()}
          variant={'outline'}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          onClick={() => formik.handleSubmit()}
          variant={'default'}
        >
          Crear Evento
        </Button>
      </div>
    </div>
  );
}

export default InputEventAd;
