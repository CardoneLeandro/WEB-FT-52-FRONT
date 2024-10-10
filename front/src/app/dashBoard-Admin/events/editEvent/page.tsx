'use client';
<<<<<<< HEAD
import InputEventAd from '@/components/inputEventAdministrator';
// import CardPreview from '@/components/inputEventAdministrator/cardPreview';
=======
import { InputEventAd } from '../../../../components/inputEventAdministrator/index';
>>>>>>> 55b17464711f90fa3b83d0c879427f94471d4153
import React, { useState } from 'react';

function EditEvent() {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
<<<<<<< HEAD
=======
  const [images, setImages] = useState<string[]|null>(['']); // Cambiado de string | null a string[]

  const [eventAddress, setEventAddress] = useState('');
>>>>>>> 55b17464711f90fa3b83d0c879427f94471d4153

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center py-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-white">
            Panel de AdministraciÃ³n de Eventos
          </h1>
        </div>
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
<<<<<<< HEAD
=======
          setImages={setImages}
          setStock={setStock}
          setPrice={setPrice}
>>>>>>> 55b17464711f90fa3b83d0c879427f94471d4153
        />
      </div>
    </div>
  );
}

export default EditEvent;