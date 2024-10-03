'use client';
import React, { useEffect, useState } from 'react';
import EventCard from '../eventCard';
import { Button } from '@/components/ui/button';
export type Event = {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  price: number;
  stock: number;
  images: string[];
};

export type EventsListProps = {
  initialEvents: Event[];
  selectedMonth?: string;
  selectedYear?: string;
  search?: string;
  showLimitedEvents?: boolean;
};

const EventsList = ({
  initialEvents,
  selectedMonth,
  selectedYear,
  search,
  showLimitedEvents,
}: EventsListProps) => {
  const [events, setEvents] = useState<Event[]>(initialEvents || []);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (page: number) => {
    const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
    setLoading(true);
    try {
      let url = `https://web-ft-52-back-1.onrender.com/events?page=${page}&limit=6`;

      if (selectedMonth) url += `&month=${selectedMonth}`;
      if (selectedYear) url += `&year=${selectedYear}`;
      if (search) url += `&title=${search}`;

      const res = await fetch(url);
      const data = await res.json();

      setEvents(data.events);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page, selectedMonth, selectedYear, search]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const filteredEvents = showLimitedEvents
    ? events
        .filter((event) => new Date(event.eventDate) >= new Date()) // Solo eventos futuros
        .sort(
          (a, b) =>
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
        ) // Ordenar por fecha más cercana
        .slice(0, 3) // Mostrar solo 3 eventos
    : events;
  if (!Array.isArray(filteredEvents) || filteredEvents.length === 0) {
    return <div>No se encontraron eventos.</div>;
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredEvents.map((event) => (
          <EventCard
            id={event.id}
            key={event.id}
            highlight={event.highlight}
            createDate={event.createDate}
            status={event.status}
            title={event.title}
            eventDate={event.eventDate}
            eventLocation={event.eventLocation}
            price={event.price}
            stock={event.stock}
            images={
              event.images.length > 0
                ? event.images[0]
                : '/path/to/placeholder-image.jpg'
            }
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePrevPage}
          disabled={page === 1}
          variant={page === 1 ? 'disabled' : 'default'}
        >
          Página anterior
        </Button>
        <span className="text-lg font-medium text-gray-600 cursor-default">
          Página {page} de {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={page === totalPages}
          variant={page === totalPages ? 'disabled' : 'default'}
        >
          Siguiente página
        </Button>
      </div>

      {loading && <p>Cargando eventos...</p>}
    </div>
  );
};

export default EventsList;
