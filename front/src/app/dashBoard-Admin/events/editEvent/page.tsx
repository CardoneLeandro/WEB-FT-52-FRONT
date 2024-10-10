'use client';
import { InputEventAd } from '../../../../components/inputEventAdministrator/index';
import React, { useState } from 'react';

function EditEvent() {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>(['']); // Cambiado de string | null a string[]

  const [eventAddress, setEventAddress] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Panel de Administración de Eventos
        </h1>
      </div>
      <div className="flex flex-col">
        <InputEventAd
          title={title}
          eventDate={eventDate}
          eventLocation={eventLocation}
          eventAddress={eventAddress}
          description={description}
          stock={stock}
          price={price}
          images={images}
          setTitle={setTitle}
          setEventDate={setEventDate}
          setEventLocation={setEventLocation}
          setEventAddress={setEventAddress}
          setDescription={setDescription}
          setImages={setImages}
          setStock={setStock}
          setPrice={setPrice}
        />
      </div>
    </div>
  );
}

export default EditEvent;
