'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import EventsList from '../components/events/eventsList';
import FeaturedEventCard from '../components/events/featuredEventCard';
import HighlightEvent from '@/components/events/eventsHighLight';
import { CalendarIcon } from 'lucide-react';

interface EventCardProps {
  id: string;
  highlight: boolean;
  status: string;
  title: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  description: string;
  price: string;
  stock: string;
  images: string[];
}

export default function Home({ initialEvents }) {
  const redirect = useRouter();
  const [events, setEvents] = useState([]);
  const { token, userSession } = useAuth();
  const [highlightedEvents, setHighlightedEvents] = useState<
    EventCardProps[] | null
  >(null);
  const [inactiveHighlightedEvents, setInactiveHighlightedEvents] = useState<
    EventCardProps[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const controls = useAnimation();

  const getEvents = async () => {
    try {
      const response = await fetch('http://localhost:3003/events');
      if (!response.ok) {
        throw new Error('Error fetching events');
      }
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    const getHighlightedEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:3003/events/highlightactive',
        );
        if (!response.ok) {
          throw new Error('Error fetching highlighted events');
        }
        const data = await response.json();
        console.log('Fetched data from API:', data);

        if (Array.isArray(data)) {
          setHighlightedEvents(data);
        } else {
          console.error('Unexpected data structure:', data);
          setHighlightedEvents(null);
        }
      } catch (error) {
        console.error('Error fetching highlighted events:', error);
        setHighlightedEvents(null);
      } finally {
        setIsLoading(false);
      }
    };

    getHighlightedEvents();
  }, []);

  useEffect(() => {
    const getInactiveHighlightedEvents = async () => {
      try {
        const response = await fetch(
          'http://localhost:3003/events/highlightinactive',
        );
        if (!response.ok) {
          throw new Error('Error fetching inactive highlighted events');
        }
        const data = await response.json();
        console.log('Fetched inactive highlighted events:', data);

        if (Array.isArray(data)) {
          setInactiveHighlightedEvents(data);
          console.log('Inactive highlighted events', data);
        } else {
          console.error('Unexpected data structure for inactive events:', data);
          setInactiveHighlightedEvents(null);
        }
      } catch (error) {
        console.error('Error fetching inactive highlighted events:', error);
        setInactiveHighlightedEvents(null);
      }
    };

    getInactiveHighlightedEvents();
  }, []);

  useEffect(() => {
    if (userSession?.status === 'pending') {
      redirect.push('/formpage');
    }
    if (events.length === 0) {
      getEvents();
    }
  }, [token, userSession, events, redirect]);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Eventos Destacados
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {isLoading ? (
              <p>Cargando eventos destacados...</p>
            ) : highlightedEvents && highlightedEvents.length > 0 ? (
              highlightedEvents.map((event) => (
                <CarouselItem key={event.id}>
                  <HighlightEvent {...event} />
                </CarouselItem>
              ))
            ) : (
              <p>No hay eventos destacados disponibles.</p>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Próximos Eventos
        </h2>
        <div className="flex flex-row mx-auto p-2">
          <EventsList initialEvents={initialEvents} showLimitedEvents={true} />
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/eventsPage" passHref>
            <Button variant="outline" className="flex items-center">
              Ver todos los eventos
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section ref={ref}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Momentos destacados
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {inactiveHighlightedEvents &&
            inactiveHighlightedEvents.length > 0 ? (
              inactiveHighlightedEvents.map((event) => (
                <CarouselItem
                  key={event.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <FeaturedEventCard
                      id={event.id}
                      title={event.title}
                      description={event.description}
                      images={event.images[0]}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <p>No hay momentos destacados disponibles.</p>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
}
