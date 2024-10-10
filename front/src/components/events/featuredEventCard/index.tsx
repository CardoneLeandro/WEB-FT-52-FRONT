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
    <Card className="w-full max-w-[400px] shadow-lg">
      <CardContent className="pt-6 space-y-3">
        <CardTitle className="cursor-default truncate" title={title}>{title}</CardTitle>
        <div className="relative w-full aspect-video"> 
          <Image
            className="rounded-xl object-cover"
            src={images}
            alt={title}
            fill
            sizes="(max-width: 350px) 100vw, 350px"
          />
          <div className="absolute inset-0 p-4 bg-gray-700 bg-opacity-0 hover:bg-opacity-80 transition-all duration-300 rounded-xl flex items-end">
            <CardDescription className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
