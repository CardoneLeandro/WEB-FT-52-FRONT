'use client';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaClock,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Event, Assistance } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const EventCardDetail: React.FC<Event> = ({
  id,
  images = [],
  title,
  // status,
  eventDate,
  eventLocation,
  eventAddress,
  stock,
  price,
  description,
<<<<<<< HEAD
}) => {
  console.log('id que recibo', id);
  return (
    <div className="m-auto">
      <aside className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-full max-w-4xl mx-auto my-6 md:ml-4 md:max-w-6xl">
        <div className="w-full md:w-2/5">
          <img
            src={
              images && images.length > 0
                ? images[0]
                : 'https://via.placeholder.com/400'
            }
            alt="Event Image"
            className="object-cover w-full h-64 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        <div className="flex flex-col justify-between p-6 w-full md:w-3/5 space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 font-semibold">{description}</p>
            <div className="space-y-2 mt-2">
              <div className="flex flex-row gap-2 text-gray-700 gap-2">
                <p className="font-bold">Ubicación: </p>
                <p>{eventLocation}</p>
              </div>
              <div className="flex flex-row gap-2 text-gray-700 gap-2">
                <p className="font-bold">Fecha:</p>
                <p>{new Date(eventDate).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-row gap-2 text-gray-700">
                <p className="font-bold">Hora:</p>
                {new Date(eventDate).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="flex flex-row gap-2 text-gray-700 gap-2">
                <p className="font-bold">Lugares:</p>
                <p>{stock}</p>
              </div>
              <div className="flex flex-row gap-2 text-gray-700">
                <p className="font-bold">Precio:</p>
                <p>{price > 0 ? price : 'gratuito'}</p>
              </div>
            </div>
=======
  vacancy,
  assistantEvents,
}) => {
  const [googleMapsLink, setGoogleMapsLink] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const { userSession, token, setAssistance } = useAuth();
  const router = useRouter();
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const [appointed, setAppointed] = useState<boolean>(false);

  const extractCoordinatesFromURL = (url: string) => {
    try {
      const queryString = new URL(url).searchParams.get('query');
      return queryString
        ? queryString.split(',').map((coord) => coord.trim())
        : [];
    } catch (error) {
      console.error('Error al crear URL:', error);
      return [];
    }
  };

  const getAddressFromCoordinates = async (coordinates: string[]) => {
    if (coordinates.length < 2) return 'Ubicación no disponible';

    const [lat, lng] = coordinates.map(Number);

    if (isNaN(lat) || isNaN(lng)) {
      return 'Ubicación no válida';
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`,
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      setGoogleMapsLink(
        `https://www.google.com/maps/search/?api=1&query=${data.results[0].formatted_address}`,
      );
      return data.results[0].formatted_address;
    }
    return `${lat}, ${lng}`;
  };

  useEffect(() => {
    if (
      userSession.assistantEvents &&
      Array.isArray(userSession.assistantEvents)
    ) {
      if (userSession.assistantEvents.find((event) => event.eventId === id)) {
        setAppointed(true);
      } else {
        setAppointed(false);
      }
    } else {
      setAppointed(false);
    }
  }, [userSession.assistantEvents, id]);

  const handleEventAsistance = async () => {
    if (!token) {
      toast.error(
        'Lo lamentamos, debes estar registrado antes para participar',
        {
          position: 'bottom-center',
        },
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:${port}/events/updateattendance/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ creator: userSession.creatorId }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error('ERROR EN LA RESPUESTA DEL SERVIDOR:', errorData);
        throw new Error(
          'No se pudo actualizar el evento. Por favor, intenta de nuevo.',
        );
      }
      console.log('eventDetail/index => funcion para apuntarse response OK')
      const data = await response.json();
      setAssistance(data.assistantEvents);
      setAppointed(!appointed);
      toast.success(
        appointed ? 'Ya no asistirás al evento' : '¡Asistirás al evento!',
        {
          position: 'bottom-center',
        },
      );
    } catch (e) {
      console.error(e);
      toast.error('Ups hubo un error intentalo de nuevo mas tarde', {
        position: 'bottom-center',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="overflow-hidden max-w-7xl mx-auto">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <img
              src={
                images && images.length > 0
                  ? images[0]
                  : '/placeholder.svg?height=600&width=600'
              }
              alt="Event Image"
              className="w-full h-96 lg:h-full object-cover"
            />
          </div>
          <div className="lg:w-1/2 p-8 lg:p-12">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <p className="text-muted-foreground text-lg">{description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                  <span className="font-medium text-lg">
                    {address || eventAddress}
                  </span>
                  {eventLocation && (
                    <a
                      href={googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                      title="Ver dirección"
                    >
                      <FaMapMarkerAlt className="text-xl" />
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-primary text-xl" />
                  <span className="text-lg">
                    {new Date(eventDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaClock className="text-primary text-xl" />
                  <span className="text-lg">
                    {new Date(eventDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaTicketAlt className="text-primary text-xl" />
                  <span className="text-lg">{stock} lugares disponibles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaDollarSign className="text-primary text-xl" />
                  <span className="text-lg">
                    {price > 0 ? `$${price}` : 'Gratuito'}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-0 mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-lg py-6"
                onClick={() => router.back()}
              >
                Volver a eventos
              </Button>

              <Button
                onClick={handleEventAsistance}
                className={`w-full sm:w-auto text-lg py-6 ${
                  appointed
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-primary hover:bg-primary/90'
                }`}
                disabled={!vacancy && !appointed}
              >
                {appointed
                  ? 'Cancelar asistencia'
                  : vacancy
                  ? 'Asistir'
                  : 'No hay cupos disponibles'}
              </Button>
            </CardFooter>
>>>>>>> 55b17464711f90fa3b83d0c879427f94471d4153
          </div>
          <div className="flex flex-row gap-4 ">
            <button className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transition-colors duration-300">
              Volver a eventos
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transition-colors duration-300">
              Asistiré
            </button>
          </div>
        </div>
<<<<<<< HEAD
      </aside>
=======
      </Card>
>>>>>>> 55b17464711f90fa3b83d0c879427f94471d4153
    </div>
  );
};

export default EventCardDetail;

