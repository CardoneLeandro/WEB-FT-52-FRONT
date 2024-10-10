'use client';
import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Imágenes para el carrusel
const images = [
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
  'https://via.placeholder.com/600x400?text=Image+4',
  'https://via.placeholder.com/600x400?text=Image+5',
];

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className='w-full max-w-2xl'
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className='relative w-full'>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className='w-full h-60 object-cover'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute left-0 top-1/2 transform -translate-y-1/2'>
        &lt;
      </CarouselPrevious>
      <CarouselNext className='absolute right-0 top-1/2 transform -translate-y-1/2'>
        &gt;
      </CarouselNext>
    </Carousel>
  );
}
