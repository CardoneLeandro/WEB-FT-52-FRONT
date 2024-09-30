'use client';

import { useEffect, useState } from 'react';
// import { ButtonIcon } from '@radix-ui/react-icons'
import EventsList from '../components/events/eventsList';
import FeaturedEventCard from '../components/events/featuredEventCard';
// import { Button } from '../components/ui/button'
import { Calendar } from 'lucide-react';
// import { useState } from 'react'
import Link from 'next/link';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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
    title: 'Explore The Galaxy',
    description:
      'Seriously, straight up, just blast off into outer space today',

    imgSrc:
      'https://imgs.search.brave.com/dyfOQ7_ZbLvAx4voghAK5dDrv0PWPne7jMiCyoROgKE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9zYW5kZXMuY29t/LmFyL3Jlc2l6ZXIv/djIvWkZUQUk2VzUz/VkNTNUI3N05BNVJC/UlpCSVkuanBnP2F1/dGg9ZjA2NjVhM2Uw/OGM1MzcxNThhZDI2/MDU2MjQ0OWMyNDI3/YjE5NTVhNmU3OGZk/NGNjMjQ0YTM2Nzlm/MjJiZjkyYyZ3aWR0/aD0xMjgwJmhlaWdo/dD03MjA',
  },
];

export default function Home() {
  const redirect = useRouter();
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  const [events, setEvents] = useState([]);
  const { token, userSession } = useAuth();

  const getEvents = async () => {
    const response = await fetch('http://localhost:3003/events');
    if (response.status !== 200) {
      throw new Error('Error fetching events');
    }
    const data = await response.json();
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', data);
    setEvents(data.events);
    return;
  };
  useEffect(() => {
    if (userSession?.status === 'pending') {
      redirect.push('/formpage');
      return;
    }
    console.log('USE EFFECT EN HOME "/"', { TOKEN: token, userSession });
    if (events.length === 0) {
      getEvents();
    }
    console.log('USE EFFECT EN HOME DE EVENTOS "/"', events);
    console.log('datos del usuario logeado', userSession);
  }),
    [token, userSession, events];

  return (
    <div className="w-full">
      <div className=" container flex flex-col ">
        <h2 className="text-3xl font-bold text-gray-500 mb-8 items-start mt-4">
          Próximos Eventos
        </h2>
        <div className="flex flex-row mx-auto p-2">
          <EventsList events={events} />
        </div>

        <Link
          href="/eventsPage"
          className="mb-6 mt-10 bg-transparent border-2 border-blue-500 text-blue-500 mx-auto rounded-md p-2 flex flex-row items-center  hover:bg-blue-500 hover:text-white transform transition duration-300 ease-in-out "
        >
          <h1>Ver todos los eventos</h1>
          <Calendar className="ml-2 h-4 w-4" />
        </Link>

        <div className="flex flex-col px-2 ">
          <h2 className="text-3xl font-bold text-gray-500 mb-8 items-start mt-4">
            Eventos destacados
          </h2>
          <div className="mb-4 flex content-center flex-col lg:flex-row gap-4 w-full flex-wrap max-w-[760px] mx-auto justify-between">
            {featuredEvents.map((event, i) => (
              <FeaturedEventCard
                imgSrc={event.imgSrc}
                title={event.title}
                description={event.description}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
