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

const featuredEvents = [
  {
    title: '50 años',
    description:
      'Cumple 50 años Maranatha, el movimiento peregrino que marcó a muchas generaciones de mendocinos',
    imgSrc:
      'https://imgs.search.brave.com/Bn9ESrWYvb4aKafewtoLAA75yNqFwRQvx3lQXzUC-Kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9zYW5kZXMuY29t/LmFyL3Jlc2l6ZXIv/djIvRkRJVTQ3QTZK/VkVOTE1MUjZXSlVF/RzJRN1EuanBnP3F1/YWxpdHk9NzUmc21h/cnQ9dHJ1ZSZhdXRo/PTQwMTM2YzQyNjU4/NDQ3MDMxMzVhNmJm/ZTBiZjNmYjZiNmIx/ZWYwMGVlZWNhZjM4/Njg4MWFhNDlmMTcz/ZDA3MWQmd2lkdGg9/OTgwJmhlaWdodD02/NDA',
  },
  {
    title: 'To The Beach',
    description: 'Plan your next beach trip with these fabulous destinations',
    imgSrc:
      'https://imgs.search.brave.com/dyfOQ7_ZbLvAx4voghAK5dDrv0PWPne7jMiCyoROgKE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9zYW5kZXMuY29t/LmFyL3Jlc2l6ZXIv/djIvWkZUQUk2VzUz/VkNTNUI3N05BNVJC/UlpCSVkuanBnP2F1/dGg9ZjA2NjVhM2Uw/OGM1MzcxNThhZDI2/MDU2MjQ0OWMyNDI3/YjE5NTVhNmU3OGZk/NGNjMjQ0YTM2Nzlm/MjJiZjkyYyZ3aWR0/aD0xMjgwJmhlaWdo/dD03MjA',
  },
  {
    title: 'Desert Destinations',
    description: "It's the desert you've always dreamed of",
    imgSrc:
      'https://imgs.search.brave.com/Bn9ESrWYvb4aKafewtoLAA75yNqFwRQvx3lQXzUC-Kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9zYW5kZXMuY29t/LmFyL3Jlc2l6ZXIv/djIvRkRJVTQ3QTZK/VkVOTE1MUjZXSlVF/RzJRN1EuanBnP3F1/YWxpdHk9NzUmc21h/cnQ9dHJ1ZSZhdXRo/PTQwMTM2YzQyNjU4/NDQ3MDMxMzVhNmJm/ZTBiZjNmYjZiNmIx/ZWYwMGVlZWNhZjM4/Njg4MWFhNDlmMTcz/ZDA3MWQmd2lkdGg9/OTgwJmhlaWdodD02/NDA',
  },
  {
    title: 'Desert Destinations',
    description: "It's the desert you've always dreamed of",
    imgSrc:
      'https://imgs.search.brave.com/Bn9ESrWYvb4aKafewtoLAA75yNqFwRQvx3lQXzUC-Kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9zYW5kZXMuY29t/LmFyL3Jlc2l6ZXIv/djIvRkRJVTQ3QTZK/VkVOTE1MUjZXSlVF/RzJRN1EuanBnP3F1/YWxpdHk9NzUmc21h/cnQ9dHJ1ZSZhdXRo/PTQwMTM2YzQyNjU4/NDQ3MDMxMzVhNmJm/ZTBiZjNmYjZiNmIx/ZWYwMGVlZWNhZjM4/Njg4MWFhNDlmMTcz/ZDA3MWQmd2lkdGg9/OTgwJmhlaWdodD02/NDA',
  },
  {
    title: 'Desert Destinations',
    description: "It's the desert you've always dreamed of",
    imgSrc:
      'https://imgs.search.brave.com/Bn9ESrWYvb4aKafewtoLAA75yNqFwRQvx3lQXzUC-Kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9zYW5kZXMuY29t/LmFyL3Jlc2l6ZXIv/djIvRkRJVTQ3QTZK/VkVOTE1MUjZXSlVF/RzJRN1EuanBnP3F1/YWxpdHk9NzUmc21h/cnQ9dHJ1ZSZhdXRo/PTQwMTM2YzQyNjU4/NDQ3MDMxMzVhNmJm/ZTBiZjNmYjZiNmIx/ZWYwMGVlZWNhZjM4/Njg4MWFhNDlmMTcz/ZDA3MWQmd2lkdGg9/OTgwJmhlaWdodD02/NDA',
  },
  {
    title: 'Desert Destinations',
    description: "It's the desert you've always dreamed of",
    imgSrc:
      'https://imgs.search.brave.com/Bn9ESrWYvb4aKafewtoLAA75yNqFwRQvx3lQXzUC-Kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9zYW5kZXMuY29t/LmFyL3Jlc2l6ZXIv/djIvRkRJVTQ3QTZK/VkVOTE1MUjZXSlVF/RzJRN1EuanBnP3F1/YWxpdHk9NzUmc21h/cnQ9dHJ1ZSZhdXRo/PTQwMTM2YzQyNjU4/NDQ3MDMxMzVhNmJm/ZTBiZjNmYjZiNmIx/ZWYwMGVlZWNhZjM4/Njg4MWFhNDlmMTcz/ZDA3MWQmd2lkdGg9/OTgwJmhlaWdodD02/NDA',
  },
  {
    title: 'Desert Destinations',
    description: "It's the desert you've always dreamed of",
    imgSrc:
      'https://imgs.search.brave.com/Bn9ESrWYvb4aKafewtoLAA75yNqFwRQvx3lQXzUC-Kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9zYW5kZXMuY29t/LmFyL3Jlc2l6ZXIv/djIvRkRJVTQ3QTZK/VkVOTE1MUjZXSlVF/RzJRN1EuanBnP3F1/YWxpdHk9NzUmc21h/cnQ9dHJ1ZSZhdXRo/PTQwMTM2YzQyNjU4/NDQ3MDMxMzVhNmJm/ZTBiZjNmYjZiNmIx/ZWYwMGVlZWNhZjM4/Njg4MWFhNDlmMTcz/ZDA3MWQmd2lkdGg9/OTgwJmhlaWdodD02/NDA',
  },
];

export default function Home({ initialEvents }) {
  const redirect = useRouter();
  const [events, setEvents] = useState([]);
  const { token, userSession } = useAuth();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [showMap, setShowMap] = useState(false);

  const controls = useAnimation();
  const getEvents = async () => {
    try {
      const response = await fetch(
        'https://web-ft-52-back-1.onrender.com//events',
      );
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
