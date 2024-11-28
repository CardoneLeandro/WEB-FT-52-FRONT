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

import { Event } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import {
  BadgeDollarSign,
  CalendarIcon,
  ClockIcon,
  DollarSign,
  DollarSignIcon,
  MapPinIcon,
  RockingChair,
  WalletCards,
} from 'lucide-react';
import page from '@/app/eventdetail/page';

const EventCardDetail: React.FC<Event> = ({
  id,
  images = [],
  title,
  status,
  eventDate,
  eventLocation,
  eventAddress,
  stock,
  currentStock,
  price,
  description,
  vacancy,
  assistantEvents,
}) => {
  const [googleMapsLink, setGoogleMapsLink] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const { userSession, token, setAssistance, logout } = useAuth();
  const router = useRouter();
  const port = process.env.NEXT_PUBLIC_APP_API_PORT;
  const [appointed, setAppointed] = useState<boolean>(false);
  const [reload, setReload] = useState(false); // Este estado controla la recarga

  const [loading, setLoading] = useState(false);  // Estado de carga para el spinner

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
    if(reload === true){
      window.location.reload();
      setReload(false);
    }
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
    
  }, [userSession.assistantEvents, id, reload]);

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

    // Mostrar el spinner mientras la petición está en curso
    setLoading(true);

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

      if (response.status === 441) {
        toast.error(`Su cuenta ha sido suspendida, por favor contactarse con nosotros via Email`);
        logout();
        signOut({ callbackUrl: '/' });
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('ERROR EN LA RESPUESTA DEL SERVIDOR:', errorData);
        throw new Error(
          'No se pudo actualizar el evento. Por favor, intenta de nuevo.',
        );
      }

      const data = await response.json();
      setAssistance(data.assistantEvents);
      setAppointed(!appointed);
      toast.success(
        appointed ? 'Ya no asistirás al evento' : '¡Asistirás al evento!',
        {
          position: 'bottom-center',
        },
      );
      
      // Una vez que todo esté listo, ocultamos el spinner y recargamos
      setLoading(false);  // Ocultar el spinner
      setReload(true);    // Recargar la página
    } catch (e) {
      console.error(e);
      toast.error('Ups hubo un error, inténtalo de nuevo más tarde', {
        position: 'bottom-center',
      });
      setLoading(false);  // Ocultar el spinner si hubo un error
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {loading ? (
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
        <Card className="overflow-hidden max-w-7xl mx-auto">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <img
                src={images && images.length > 0 ? images[0] : '/placeholder.svg'}
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
                    {eventLocation && (
                      <a
                        href={eventLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="Ver dirección"
                      >
                        <MapPinIcon className="mr-2 text-blue-500 flex-shrink-0" />
                      </a>
                    )}
                    <span className="text-lg ">{eventAddress}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-lg">
                      {new Date(eventDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ClockIcon className="mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-lg">
                      {new Date(eventDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RockingChair className="mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-lg">{currentStock} lugares disponibles</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BadgeDollarSign className="mr-2 text-blue-500 flex-shrink-0 " />
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
                  className={`w-full sm:w-auto text-lg py-6 ${appointed
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300'
                    }`}
                  disabled={!vacancy && !appointed}
                >
                  {appointed ? 'Cancelar asistencia' : vacancy ? 'Asistir' : 'No hay cupos disponibles'}
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EventCardDetail;
