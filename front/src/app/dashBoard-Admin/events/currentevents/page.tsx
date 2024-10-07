'use client';

import { useState, useEffect } from 'react';
import AdminListComponent, { Item } from '@/components/adminPanel/adminListComponent';
import { useAuth } from '@/context/AuthContext';

interface Event {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  eventAdress: string;
  price: string;
  stock: string;
  images: string[];
  description: string;
  isActive: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventEdit, setEventEdit] = useState<string>('');
  const { token, userSession } = useAuth();

  const getEvents = async () => {
    try {
      const response = await fetch('http://localhost:3003/events');
      if (response.status !== 200) {
        throw new Error('Error fetching events');
      }
      const data = await response.json();
      setEvents(data.events);
    } catch (err) {
      setError('No se pudieron cargar los eventos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleToggleAction = async (event: Item) => {
    try {
      // Actualizamos el campo "highlight" del evento
      const updatedEvent = { ...event, highlight: !event.highlight };

      // Hacemos la solicitud PATCH al backend
      const response = await fetch(
        `http://localhost:3003/auth/events/edit/${event.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ highlight: updatedEvent.highlight }),
        },
      );

      if (response.status !== 200) {
        throw new Error('Error al actualizar el estado del evento.');
      }

      // Si la actualización es exitosa, actualizamos el estado local de eventos
      setEvents(
        events.map((e) =>
          e.id === event.id ? { ...e, highlight: updatedEvent.highlight } : e,
        ),
      );
    } catch (error) {
      setError('No se pudo destacar el evento.');
    }
  };

  const getToggleLabel = (highlight: boolean) =>
    highlight ? 'No destacar' : 'Destacar';

  const handleUpdateEvent = async (updatedEvent: Item) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/events/edit/${updatedEvent.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEvent),
        },
      );

      if (response.status !== 200) {
        throw new Error('Error updating event');
      }

      const updatedEventData = await response.json();
      console.log(updatedEventData);
      setEvents(
        events.map((event) =>
          event.id === updatedEvent.id ? { ...event, ...updatedEventData } : event,
        ),
      );
    } catch (err) {
      setError('No se pudo actualizar el evento.');
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center py-10">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">
            Panel de Administración de Eventos
          </h1>
        </div>
      </div>

      <div className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {loading ? (
              <p>Cargando eventos...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <AdminListComponent
                type="event"
                items={events.map((event) => ({
                  id: event.id.toString(),
                  title: event.title,
                  description: event.description,
                  isActive: event.isActive,
                  image: event.images[0] || '/default-event-image.jpg',
                  eventDate: new Date(event.eventDate).toISOString().split('T')[0],
                  eventAdress: event.eventAdress,
                  price: event.price,
                  stock: event.stock,
                  highlight: event.highlight,
                }))}
                onToggleAction={handleToggleAction}
                getToggleLabel={getToggleLabel}
                onUpdateEvent={handleUpdateEvent}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
