'use client';

import { useState, useEffect } from 'react';
import AdminListComponent, {
  Item,
} from '@/components/adminPanel/adminListComponent';

interface Event {
  id: number;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  price: number;
  stock: number;
  images: string[];
  description: string;
  isActive: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [eventEdit, setEventEdit] = useState<string>('');

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

  const handleToggleAction = (event: Item) => {
    setEvents(
      events.map((e) =>
        e.id === Number(event.id) ? { ...e, isActive: !e.isActive } : e,
      ),
    );
  };

  const getToggleLabel = (isActive: boolean) =>
    isActive ? 'No destacar' : 'Destacar';

  const handleUpdateEvent = async (updatedEvent: Item) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/events/edit/${updatedEvent.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEvent),
        },
      );

      if (response.status !== 200) {
        throw new Error('Error updating event');
      }

      const updatedEventData = await response.json();

      setEvents(
        events.map((event) =>
          event.id === Number(updatedEvent.id)
            ? { ...event, ...updatedEventData }
            : event,
        ),
      );
    } catch (err) {
      setError('No se pudo actualizar el evento.');
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-green-500 flex justify-between items-center  py-10">
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
                  eventDate: new Date(event.eventDate)
                    .toISOString()
                    .split('T')[0],
                  eventLocation: event.eventLocation,
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
