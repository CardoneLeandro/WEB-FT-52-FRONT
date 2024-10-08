'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { CalendarIcon, MapPinIcon, ClockIcon, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { set } from 'date-fns';
import { Event } from '@/context/AuthContext';

export default function Home() {
  const redirect = useRouter();
  const { allEvents, token, userSession } = useAuth();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [showMap, setShowMap] = useState(false);
  const controls = useAnimation();

  //RENDERIZAR LAS CARD DESDE ESTOS 3 ESTADOS
  const [events, setEvents] = useState<Event[]>([]);
  const [highlight, setHighlight] = useState<Event[]>([]);
  const [moments, setMoments] = useState<Event[]>([]);


  useEffect(() => {
    if (userSession?.status === 'pending') {
      redirect.push('/formpage');
    }
    setEvents([]);
    setHighlight([]);
    setMoments([]);

    allEvents?.map((event) => {
      if(event.highlight === true && event.status === 'active'){
        setHighlight((prevHighlight) => [...prevHighlight, event]);
      }
      if(event.highlight === false && event.status === 'active'){
        setEvents((prevEvent) => [...prevEvent, event]);}

      if(event.highlight === true && event.status === 'inactive'){
        setMoments((prevMoments) => [...prevMoments, event]);
      }
    });
  }, [token, userSession, allEvents, redirect]);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Evento Destacado
        </h2>
        <Card className="bg-white text-gray-800 shadow-lg max-w-4xl mx-auto overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Concierto de Rock en el Parque"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <Button
                    size="sm"
                    className="absolute top-4 right-4"
                    onClick={() => setShowMap(!showMap)}
                  >
                    {showMap ? (
                      <ImageIcon className="mr-2" />
                    ) : (
                      <MapPinIcon className="mr-2" />
                    )}
                    {showMap ? 'Ver Imagen' : 'Ver Mapa'}
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Concierto de Rock en el Parque
                </CardTitle>
                <CardDescription className="text-gray-600">
                  <div className="flex items-center mt-2">
                    <CalendarIcon className="mr-2 text-blue-500" />
                    <h1>15 de Julio, 2024</h1>
                  </div>
                  <div className="flex items-center mt-2">
                    <MapPinIcon className="mr-2 text-blue-500" />
                    <h1>Parque Central</h1>
                  </div>
                  <div className="flex items-center mt-2">
                    <ClockIcon className="mr-2 text-blue-500" />
                    <h1>20:00 - 23:00</h1>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700">
                  Disfruta de una noche llena de rock con las mejores bandas
                  locales. Habrá comida, bebidas y mucha diversión.
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                  Asistiré
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
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
          Momentos Destacados
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {featuredEvents.map((event, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <FeaturedEventCard
                    imgSrc={event.imgSrc}
                    title={event.title}
                    description={event.description}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
}
