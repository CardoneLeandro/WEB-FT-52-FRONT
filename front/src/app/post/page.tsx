'use client';
import React, { useEffect, useState } from 'react';
import PostCard from '@/components/post/postCard';
import { useAuth } from '@/context/AuthContext';

interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
}

export default function Post() {
  const { userSession } = useAuth();
  const favorites: string[] = userSession?.favorites || [];
  const [postList, setPostList] = useState<IPost[]>([]);

  const getPosts = async () => {
    try {
      const res = await fetch('http://localhost:3003/posts');
      const parsedRes = await res.json();
      setPostList(parsedRes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
      getPosts();
  }, [userSession]);

  return (
    <div className='relative flex flex-col w-full h-[80vh] max-h-[80vh] items-center p-10 gap-10 justify-around overflow-y-scroll'>
      {postList.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          isAdded={favorites.includes(post.id)}
        />
      ))}
    </div>
  );
}
