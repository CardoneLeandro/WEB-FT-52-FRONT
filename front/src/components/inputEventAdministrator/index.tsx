import React, { useEffect, useState } from 'react';
import { DatePickerDemo } from './datePicker';
import { Input } from '@/components/ui/input';
import { InputFile } from './inputFile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import IInputEventAdProps from '@/interfaces/IInputEventAdProps';
import toast from 'react-hot-toast';
import GoogleMap from '../GoogleMaps';

function InputEventAd({
  title,
  eventDate,
  eventLocation,
  description,
  price,
  stock,
  setTitle,
  setEventDate,
  setEventLocation,
  setDescription,
  setPrice,
  setStock,
}: Partial<IInputEventAdProps>) {
  const { token, userSession } = useAuth();
  const [image, setImage] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(false); 

  useEffect(() => {
    console.log('useEffect ejecutado con userSession:', userSession);
  }, [userSession, token]);

  const port = process.env.NEXT_PUBLIC_APP_API_PORT;

  const handleSubmit = async () => {
    const creatorId = userSession?.creatorId;

    if (!title || !eventDate || !eventLocation || !description || !image) {
      toast.error('Todos los campos son obligatorios.', {
        position: 'bottom-center',
      });
      return;
    }

    if (!creatorId) {
      toast.error('Se requiere autenticación para crear un evento.', {
        position: 'bottom-center',
      });
      return;
    }

    const cleanedDateString = eventDate.replace(/(\d+)(th|st|nd|rd)/, '$1');
    const eventDateConverted = new Date(cleanedDateString);

    const eventData = {
      title,
      description,
      eventDate: eventDateConverted,
      eventLocation,
      images: [image],
      stock: stock || 0,
      price: price || 0,
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
  };

  const toggleMap = () => {
    setShowMap(true); 
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-bold text-[28px] text-gray-500 mb-4">Crear evento:</h1>

      <div className="flex flex-row gap-8">
        <div className="w-1/2">
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Nombre del evento"
              className="bg-white"
              onChange={(e) => setTitle!(e.target.value)}
            />
            <DatePickerDemo onChange={(date: string) => setEventDate!(date)} />

            <div className="flex items-center gap-2">
              <Button
                onClick={toggleMap}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Buscar Ubicación
              </Button>
              <Input
                type="text"
                placeholder="Ubicación"
                className="bg-white flex-grow"
                value={eventLocation}
                onChange={(e) => setEventLocation!(e.target.value)}
              />
            </div>

            <Input
              type="text"
              placeholder="Descripción del evento"
              className="bg-white"
              onChange={(e) => setDescription!(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Costo del evento"
              className="bg-white"
              defaultValue={''}
              onChange={(e) => setPrice!(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Capacidad de asistentes"
              defaultValue={''}
              className="bg-white"
              onChange={(e) => setStock!(e.target.value)}
            />
            <InputFile
              onImageUpload={(imageUrl: string) => {
                setImage(imageUrl);
              }}
            />
             
          {showMap && (
            <div className="mt-4 w-full items-start"> 
              <GoogleMap setEventLocation={setEventLocation} />
            </div>
          )}
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-start"> 
          <h2 className="font-bold text-[24px] text-gray-500 mb-2">Previsualización:</h2>
          <div className="border p-4 rounded-lg shadow-lg max-w-sm">
            <img
              src={image || 'https://via.placeholder.com/400'}
              alt={title}
              className="w-full h-48 object-contain rounded-lg"
            />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">{title || 'Nombre del evento'}</h2>
              <p className="text-gray-700">{eventDate || 'Fecha no definida'}</p>
              <p className="text-gray-700">{eventLocation || 'Ubicación no definida'}</p>
              <p className="text-gray-600 mt-2">{description || 'Descripción no disponible'}</p>
            </div>
          </div>

         
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button className="bg-transparent text-blue-500 border-2 border-blue-500 hover:bg-blue-600 hover:text-white">
          Cancelar
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          onClick={handleSubmit}
        >
          Crear Evento
        </Button>
      </div>
    </div>
  );
}

export default InputEventAd;
