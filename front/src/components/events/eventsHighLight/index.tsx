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
import { Event } from '@/context/AuthContext';

// interface EventHighlight {
//   id: string;
//   highlight: boolean;
//   status: string;
//   title: string;
//   eventDate: Date;
//   eventLocation: string;
//   eventAddress: string;
//   description: string;
//   price: string;
//   stock: string;
//   images: string[];
// }

const HighlightEvent: React.FC<Event> = ({
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
    <Card className=" text-gray-800 shadow-xl max-w-4xl mx-auto overflow-hidden">
      <div className="md:flex h-[400px]">
        <div className="md:w-1/2 h-full">
          <div className="relative w-full h-full">
            {images && images.length > 0 ? (
              <Image
                src={images[0]}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col h-full">
          {' '}
          {/* Full height for content */}
          <CardHeader className="flex-grow-0">
            <CardTitle className="text-2xl font-bold text-gray-900 line-clamp-2">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              <div className="flex items-center mt-2">
                <CalendarIcon className="mr-2 text-blue-500 flex-shrink-0" />
                <span className="font-semibold mr-1">Fecha:</span>
                <span>{new Date(eventDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="font-semibold mr-1">Ver en GoogleMaps</span>
                <a
                  href={googleMapsLink || eventLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPinIcon className="mr-2 text-blue-500 flex-shrink-0" />
                </a>

                <span className="line-clamp-1">{eventAddress}</span>
              </div>
              <div className="flex items-center mt-2">
                <ClockIcon className="mr-2 text-blue-500 flex-shrink-0" />
                <span className="font-semibold mr-1">Hora:</span>
                <span>
                  {new Date(eventDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <p className="text-gray-700">{description}</p>
          </CardContent>
          <CardFooter className="flex-grow-0">
            <Button className="w-full">Asistiré</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default HighlightEvent;
