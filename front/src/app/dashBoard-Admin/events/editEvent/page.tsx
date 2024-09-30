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
  );
}

export default EditEvent;
