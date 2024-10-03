import React from 'react';
import PreviewCardProps from '@/interfaces/IPreviewCardProps';

function CardPreview({
  title,
  eventDate,
  eventLocation,
  description,
  image,
}: PreviewCardProps) {
  return (
    <div>
      <h1 className="font-bold text-[28px] text-gray-500 mb-4">
        Previsualización de creación de evento:
      </h1>

      <div className=" mx-auto flex items-center justify-center">
        <div className="border p-4 rounded-lg shadow-lg max-w-sm">
          <img
            src={image || 'https://via.placeholder.com/400'}
            alt={title}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="p-4">
            <h2 className="font-bold text-xl mb-2">
              {title || 'Nombre del evento'}
            </h2>
            <p className="text-gray-700">{eventDate || 'Fecha no definida'}</p>
            <p className="text-gray-700">
              {eventLocation || 'Ubicación no definida'}
            </p>
            <p className="text-gray-600 mt-2">
              {description || 'Descripción no disponible'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPreview;
