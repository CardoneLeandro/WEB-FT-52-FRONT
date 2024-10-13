import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

interface FeaturedEventProps {
  id: string;
  images: string;
  description: string;
  title: string;
}

export default function FeaturedEventCard({
  id,
  images,
  description,
  title,
}: FeaturedEventProps) {
  return (
    <Card className="w-full max-w-[400px] h-[350x] shadow-lg flex flex-col transition-transform hover:scale-105">
      <CardContent className="pt-6 space-y-3 flex-grow">
        <CardTitle className="cursor-default truncate" title={title}>
          {title}
        </CardTitle>
        <div className="relative w-full h-[250px]">
          <Image
            className="rounded-xl object-cover"
            src={images}
            alt={title}
            fill
            sizes="(max-width: 350px) 100vw, 350px"
            style={{ borderRadius: '0.75rem' }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 bg-gray-100 bg-opacity-0 hover:bg-opacity-60 transition-all duration-300 rounded-xl hover:scale-105 group">
            <CardDescription className="text-black  font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
