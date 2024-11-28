'use client';
import { useAuth } from '@/context/AuthContext';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import React from 'react';

export default function PostCard({
  id,
  title,
  content,
  author,
  isAdded,
  isSelected
}: {
  id: string;
  title: string;
  content: string;
  author: string;
  isAdded: boolean | false;
  isSelected: boolean;

}) {
  const { setFavorites, token, userSession } = useAuth();

  const add = async () => {

    if (!userSession?.creatorId || !token) {
      console.error("No se pudo enviar la solicitud. Faltan datos de usuario o token.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3003/posts/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, creator: userSession.creatorId }),
      });

      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      } else {
        alert(res.statusText);
      }
    } catch (err) {
      alert(`Error al enviar la solicitud: ${err}`,);
    }
  };

  return (

    <div className={`relative flex flex-col w-[350px] h-[150px] min-w-[350px] min-h-[150px] max-w-[350px] max-h-[150px] justify-between border rounded-lg shadow-md ${
    isSelected ? 'border-blue-500' : isAdded ? 'border-amber-500' : ''
  }`}>




      <div className="mx-4 my-2 flex flex-row justify-between">
        <div className="font-bold text-xl">{title}</div>
        <div className="flex items-center justify-around">
          <button onClick={() => add()}>
            {isAdded ? (
              <StarFilledIcon className="w-[20px] h-[20px] text-amber-400 fill-amber-500" />
            ) : (
              <StarIcon className="w-[20px] h-[20px] text-black" />
            )}
          </button>
        </div>
      </div>
      <div className="text-md ml-4 my-2 h-1/3 overflow-hidden">{content}</div>
      <div className="relative flex w-full gap-2 justify-end items-center px-4">
              <div className='text-xs mb-0'>publicado por:</div>
              <div className='text-sm'>{author}</div>
              </div>
    </div>
  );
}