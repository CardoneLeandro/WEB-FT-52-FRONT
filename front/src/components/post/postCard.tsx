import React from 'react';

export default function PostCard({title, content, author}:{title:string, content:string, author:string}) {
  return (
    <div className='relative flex flex-col w-[1000px] h-[300px] py-4 gap-4 m-auto border rounded-lg shadow-md'>
        <div className='font-bold text-2xl ml-4'>{title}</div>
        <div className='text-lg ml-8'>{content}</div>
        <div className='relative flex w-full h-fit text-md justify-end pr-4'>
            {author}
        </div>
    </div>
  );
}
