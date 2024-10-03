'use client';
import InputEventAd from '@/components/inputEventAdministrator';
import CardPreview from '@/components/inputEventAdministrator/cardPreview';
import React, { useState } from 'react';

function EditEvent() {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center rounded-t-xl py-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">
            Panel de Administración de Eventos
          </h1>
        </div>
      </div>
      <div className="flex flex-col">
        <InputEventAd
          title={title}
          eventDate={eventDate}
          eventLocation={eventLocation}
          description={description}
          setTitle={setTitle}
          setEventDate={setEventDate}
          setEventLocation={setEventLocation}
          setDescription={setDescription}
          setImages={setImages}
        />
      </div>
    </div>
  );
}

export default EditEvent;
