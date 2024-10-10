"use client";

import React, { useEffect, useState, useCallback } from 'react';
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
  eventAddress: string;
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

export default function EventsList({
  initialEvents,
  selectedMonth,
  selectedYear,
  search,
  showLimitedEvents,
}: EventsListProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents || []);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    month: selectedMonth,
    year: selectedYear,
    search: search,
  });

  const fetchEvents = useCallback(async (currentPage: number, currentFilters: typeof filters) => {
    if (showLimitedEvents) return;

    setLoading(true);
    try {
      let url = `http://localhost:3003/events?page=${currentPage}&limit=6`;

      if (currentFilters.month) url += `&month=${currentFilters.month}`;
      if (currentFilters.year) url += `&year=${currentFilters.year}`;
      if (currentFilters.search) url += `&title=${currentFilters.search}`;

      const res = await fetch(url);
      const data = await res.json();

      setEvents(data.events);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }, [showLimitedEvents]);

  useEffect(() => {
    setFilters({
      month: selectedMonth,
      year: selectedYear,
      search: search,
    });
    setPage(1); 
  }, [selectedMonth, selectedYear, search]);

  useEffect(() => {
    if (!showLimitedEvents) {
      fetchEvents(page, filters);
    }
  }, [page, filters, showLimitedEvents, fetchEvents]);

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
        .filter((event) => new Date(event.eventDate) >= new Date())
        .sort(
          (a, b) =>
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
        )
        .slice(0, 3)
    : events;

  if (!Array.isArray(filteredEvents) || filteredEvents.length === 0) {
    return <div>No se encontraron eventos.</div>;
  }

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
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
            eventAddress={event.eventAddress}
            price={event.price}
            stock={event.stock}
            images={
              event.images && event.images.length > 0
                ? event.images[0]
                : '/path/to/placeholder-image.jpg'
            }
          />
        ))}
      </div>

      {!showLimitedEvents && !loading && (
        <div className="flex justify-between items-center mt-4 gap-4">
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
      )}

      {loading && <p>Cargando eventos...</p>}
    </div>
  );
}