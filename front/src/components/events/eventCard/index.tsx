import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card';

interface EventCardProps {
  id: string;
  key: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  price: number;
  stock: number;
  images: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  key,
  highlight,
  createDate,
  status,
  title,
  eventDate,
  eventLocation,
  eventAddress,
  price,
  stock,
  images,
}) => {
  const router = useRouter();
  const [highlighted, setHighlighted] = useState(highlight);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');

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
      const address = data.results[0].formatted_address;
      setGoogleMapsLink(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      ); // Formato del enlace
      return address;
    }
    return `${lat}, ${lng}`;
  };

  useEffect(() => {
    if (eventLocation) {
      const coordinates = extractCoordinatesFromURL(eventLocation);
      getAddressFromCoordinates(coordinates).then((address) => {
        setFormattedAddress(address);
      });
    }
  }, [eventLocation]);

  const handleHighlightToggle = async () => {
    setHighlighted(!highlighted);

    try {
      const response = await fetch(
        'https://web-ft-52-back-1.onrender.com/events/highlight',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: id,
            highlight: !highlighted,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Error al actualizar el estado del evento');
      }

      const data = await response.json();
      console.log('Evento actualizado:', data);
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const handleViewDetails = () => {
    router.push(`/eventdetail/${id}`);
  };

  return (
    <Card className="flex-shrink-0 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="cursor-default">{title}</CardTitle>
        </div>
        <CardDescription className="cursor-default">
          <time>{new Date(eventDate).toLocaleDateString()}</time>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="justify-between items-center flex flex-col">
          <div>
            <p>Dirección: {eventAddress}</p>
            {eventLocation ? (
              <p className="flex items-center mb-4 cursor-pointer">
                Ver ubicación en Google Maps
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                </a>
              </p>
            ) : (
              <p>Ubicación no disponible</p>
            )}
          </div>
          <div
            className="ml-4 flex justify-center"
            style={{ height: '180px', width: '180px' }}
          >
            {images ? (
              <Image
                src={images}
                alt={title}
                width={180}
                height={180}
                className="rounded-md object-cover mx-auto"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-x-4 items-center justify-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant={'outline'} onClick={handleViewDetails}>
              Ver detalles
            </Button>
          </HoverCardTrigger>
        </HoverCard>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
