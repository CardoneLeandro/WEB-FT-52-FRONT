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
import HighlightEvent from '@/components/events/eventsHighLight';
import FeaturedEventCard from '../components/events/featuredEventCard';
import NearbyEvents from '@/components/nearbyEvents';
import { CalendarIcon } from 'lucide-react';
import { Event } from '@/context/AuthContext';

export default function Home() {
  const redirect = useRouter();
  const { allEvents, token, userSession, getEvents } = useAuth();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();
  const today = new Date();

  const [highlight, setHighlight] = useState<Event[]>([]);
  const [moments, setMoments] = useState<Event[]>([]);
  const [incommingEvents, setIncommingEvents] = useState<Event[]>([]);

  useEffect(() => {
    console.log('USEEFFECT HOME => TOKEN, USERSESSION', token, userSession);
    if (userSession?.status === 'pending') {
      redirect.push('/formpage');
    }

    const fetchEvents = async () => {
      if (!allEvents || allEvents.length === 0) {
        await getEvents();
      }

      const newHighlight: Event[] = [];
      const newMoments: Event[] = [];
      const activeEvents: Event[] = [];

      allEvents?.forEach((event) => {
        if (event.highlight && event.status === 'active') {
          newHighlight.push(event);
        } else if (!event.highlight && event.status === 'active') {
          activeEvents.push(event);
        } else if (event.highlight && event.status === 'inactive') {
          newMoments.push(event);
        }
      });

      setHighlight(newHighlight);
      setMoments(newMoments);

      const sortedIncommingEvents = activeEvents
        .filter((event) => new Date(event.eventDate) >= today)
        .sort(
          (a, b) =>
            new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
        )
        .slice(0, 3);

      setIncommingEvents(sortedIncommingEvents);
    };

    fetchEvents();
  }, [allEvents, getEvents, userSession, redirect]);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Eventos Destacados */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Eventos Destacados
        </h2>
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {highlight.length > 0 ? (
              highlight.map((event) => (
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

      {/* Próximos Eventos */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Próximos Eventos
        </h2>
        <div className="flex flex-row mx-auto p-2 justify-center">
          <NearbyEvents setEvents={incommingEvents} />
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

      {/* Momentos Destacados */}
      <section ref={ref}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Momentos destacados
        </h2>
        <Carousel
          opts={{ align: 'start', loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {moments.length > 0 ? (
              moments.map((event) => (
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
