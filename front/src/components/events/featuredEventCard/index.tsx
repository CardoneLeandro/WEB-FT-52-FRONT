import React from 'react';
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import Image from 'next/image';

type featuredEventProps = {
  imgSrc: string;
  description: string;
  title: string;
};

function FeaturedEventCard({ imgSrc, description, title }: featuredEventProps) {
  return (
    <Card className="w-1/2 max-w-[350px] shadow-lg ">
      <CardContent className="pt-6  ">
        <CardTitle className="mb-4">{title}</CardTitle>
        <div className="relative aspect-[16/9] w-full ">
          <Image className="rounded-xl" src={imgSrc} fill alt={title} />
          <div className="absolute bottom-0 p-4 bg-gray-700 opacity-0 h-full w-full hover:opacity-80 transition-all rounded-xl ">
            <CardDescription className=" text-white font-semibold">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FeaturedEventCard;
