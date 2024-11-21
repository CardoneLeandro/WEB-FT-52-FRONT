'use client';
import React, { useEffect, useState } from 'react';
// import { postListHC } from '@/utils/postList';
import PostCard from '@/components/post/postCard';

interface IPost {
  id:string,
  title:string,
  content:string,
  author:string
}

export default function Post() {
  const [postList, setPostList] = useState<IPost[]>([])
  const getPosts = async () => {
    fetch('http://localhost:3003/posts')
    .then((res) => res.json())
    .then((parsedRes) => setPostList(parsedRes))
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getPosts()
  },[])

  return (
    <div className='relative flex flex-col w-full h-[80vh] max-h-[80vh] items-center p-10 gap-10 justify-around overflow-y-scroll'>
      {postList.map((post) => 
      <PostCard key={post.id} title={post.title} content={post.content} author={post.author}/>
      )}
    </div>
  );
}
