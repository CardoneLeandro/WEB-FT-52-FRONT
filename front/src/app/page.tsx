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

import FeaturedEventCard from '../components/events/featuredEventCard';
import { CalendarIcon, MapPinIcon, ClockIcon, ImageIcon } from 'lucide-react';
import HighlightEvent from '@/components/events/eventsHighLight';
// import Image from 'next/image';
// import { set } from 'date-fns';
import { Event } from '@/context/AuthContext';
import NearbyEvents from '@/components/nearbyEvents';

export default function Home() {
  const redirect = useRouter();
  const { allEvents, token, userSession } = useAuth();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const today = new Date();
  // const [showMap, setShowMap] = useState(false);
  const controls = useAnimation();

  //RENDERIZAR LAS CARD DESDE ESTOS 3 ESTADOS
  const [events, setEvents] = useState<Event[]>([]);
  const [highlight, setHighlight] = useState<Event[]>([]);
  const [moments, setMoments] = useState<Event[]>([]);

  //! UTILIZAR "INCOMMINGEVENTS" PARA RENDERIZAR LAS 3 TARJETAS

  useEffect(() => {
    if (userSession?.status === 'pending') {
      redirect.push('/formpage');
    }
    setEvents([]);
    setHighlight([]);
    setMoments([]);

    allEvents?.map((event) => {
      if (event.highlight === true && event.status === 'active') {
        setHighlight((prevHighlight) => [...prevHighlight, event]);
      }
      if (event.highlight === false && event.status === 'active') {
        setEvents((prevEvent) => [...prevEvent, event]);
      }

      if (event.highlight === true && event.status === 'inactive') {
        setMoments((prevMoments) => [...prevMoments, event]);
      }
    });
    const incommingEvents = events
      .filter((event) => new Date(event.eventDate) >= today)
      .map((event) => ({ ...event, eventDate: new Date(event.eventDate) }))
      .sort(
        (a: Event, b: Event) => a.eventDate.getTime() - b.eventDate.getTime(),
      )
      .slice(0, 3);
    setIncommingEvents(incommingEvents);
  }, [token, userSession, allEvents, redirect]);
  const [incommingEvents, setIncommingEvents] = useState([]);
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);
  console.log('allEvents@@@@@@@@@@@@@@@@q', events);
  console.log('allEvents++++++++++++', allEvents);
  console.log('incommingEvents!!!!!!!!!!!!!!!!!!', incommingEvents);
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
            {highlight && highlight.length > 0 ? (
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
            {moments && moments.length > 0 ? (
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
