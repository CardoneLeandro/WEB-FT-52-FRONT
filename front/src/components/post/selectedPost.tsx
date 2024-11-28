'use client';
import { useAuth } from '@/context/AuthContext';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import React from 'react';

export default function SelectedPostCard({
  id,
  title,
  content,
  author,
  isAdded,
}: {
  id: string;
  title: string;
  content: string;
  author: string;
  isAdded: boolean;
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
  <div className="relative flex flex-col w-[1100px] h-[515px] justify-between m-auto border border-blue-500 rounded-lg shadow-md">
          
          <div className=" mx-8 mt-2 flex flex-row justify-between h-1/5">
            <div className="font-bold text-2xl my-auto">
              {title}
            </div>
            <div className="flex items-center justify-around">
              <button
                onClick={() => add()}
              >
                {isAdded ? (
                  <StarFilledIcon className="w-[24px] h-[24px] text-amber-400 fill-amber-500" />
                ) : (
                  <StarIcon className="w-[24px] h-[24px] text-black" />
                )}
              </button>
            </div>
          </div>

          <div className=" text-xl text-justify p-6 mx-8 h-3/5">
            {content}
          </div>
          <div className=" relative flex w-full h-1/5 gap-2 justify-end items-center  px-4">
            <div className="text-sm">publicado por:</div>
            <div className="text-md">{author}</div>
          </div>
        </div>
  );
}