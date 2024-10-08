'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CalendarIcon, MapPinIcon, ClockIcon, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface EventHighlight {
  id: string;
  highlight: boolean;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  description: string;
  price: string;
  stock: string;
  images: string[];
}

const HighlightEvent: React.FC<EventHighlight> = ({
  id,
  title,
  eventDate,
  eventLocation,
  eventAddress,
  description,
  images,
}) => {
  const [googleMapsLink, setGoogleMapsLink] = useState<string>('');
  const [address, setAddress] = useState<string>('');

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
    const coordinates = extractCoordinatesFromURL(eventLocation || '');
    const fetchAddress = async () => {
      const fetchedAddress = await getAddressFromCoordinates(coordinates);
      setAddress(fetchedAddress);
    };

    if (coordinates.length > 0) {
      fetchAddress();
    } else {
      setAddress(eventAddress);
    }
  }, [eventLocation, eventAddress]);

  return (
    <Card className="bg-white text-gray-800 shadow-lg max-w-4xl mx-auto overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative h-64 md:h-full">
            {images && images.length > 0 ? (
              <Image
                src={images[0]}
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"></div>
          </div>
        </div>
        <div className="md:w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              <div className="flex items-center mt-2">
                <CalendarIcon className="mr-2 text-blue-500" />
                <h1>Fecha: </h1>
                <p>{new Date(eventDate).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center mt-2">
                <a href={eventLocation}>
                  <MapPinIcon className="mr-2 text-blue-500" />
                </a>
                <h1>Ubicación: {eventAddress} </h1>
              </div>
              <div className="flex items-center mt-2">
                <ClockIcon className="mr-2 text-blue-500" />
                <h1>
                  {new Date(eventDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </h1>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-gray-700">{description}</div>
          </CardContent>
          <CardFooter>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              Asistiré
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default HighlightEvent;
