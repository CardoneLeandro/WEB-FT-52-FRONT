'use client';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface EventCardProps {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string; 
  eventAddress: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
}

const EventCardDetail: React.FC<EventCardProps> = ({
  id,
  images = [],
  title,
  status,
  eventDate,
  eventLocation, 
  eventAddress,
  stock,
  price,
  description,
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
    const coordinates = extractCoordinatesFromURL(eventLocation); 
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
    <div className="flex justify-center p-4">
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
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 font-semibold">{description}</p>
            <div className="space-y-2 mt-2">
              <div className="flex flex-row items-center gap-2 text-gray-700">
                <p className="font-bold">Ubicación: {address || eventAddress}</p>
                {eventLocation && (
                  <a
                    href={googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title="Ver dirección"
                  >
                    <FaMapMarkerAlt className="text-lg" />
                  </a>
                )}
              </div>
              <div className="flex flex-row gap-2 text-gray-700">
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
              <div className="flex flex-row gap-2 text-gray-700">
                <p className="font-bold">Lugares:</p>
                <p>{stock}</p>
              </div>
              <div className="flex flex-row gap-2 text-gray-700">
                <p className="font-bold">Precio:</p>
                <p>{price > 0 ? price : 'gratuito'}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <button className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transition-colors duration-300">
              Volver a eventos
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full md:w-auto transition-colors duration-300">
              Asistiré
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EventCardDetail;
