'use client';
import React, { useEffect, useState } from 'react';
import PostCard from '@/components/post/postCard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import SelectedPostCard from '@/components/post/selectedPost';

interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
}

export default function Post() {
  const { userSession, postButtonStatus, setPostButtonStatus } = useAuth();
  const favorites: string[] = userSession?.favorites || [];
  const [postList, setPostList] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost>({
    id: '',
    title: '',
    content: '',
    author: '',
  });


  const getPosts = async () => {
    try {
      const res = await fetch('http://localhost:3003/posts');
      const parsedRes = await res.json();
      setPostList(parsedRes);
      setSelectedPost(parsedRes[0]);

      if (postButtonStatus === 'fav') {
        filterPosts(parsedRes);
      } else {
        setFilteredPosts(parsedRes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filterPosts = (posts: IPost[]) => {
    const filtered = posts.filter((post) => favorites.includes(post.id));
    setFilteredPosts(filtered);

    if (filtered.length === 0) {
      setPostButtonStatus('all');
    }
  };

  useEffect(() => {
    getPosts();
  }, [postButtonStatus, favorites]);

  const handleViewFavorites = () => {
    if (favorites.length > 0) {
      filterPosts(postList);
      setPostButtonStatus('fav');
    } else {
      setPostButtonStatus('all');
      setFilteredPosts(postList);
    }
  };

  const handleViewAll = () => {
    setFilteredPosts(postList);
    setPostButtonStatus('all');
  };

  return (
    <div className="flex flex-row w-full h-full ">
      <div className=" relative flex flex-col w-[25%] h-full ml-4 items-center gap-2  ">
        <div className="my-4 flex flex-row gap-10 items-center mr-4 ">
          <Button
            disabled={favorites.length === 0}
            variant={
              postButtonStatus === 'fav' || favorites.length === 0
                ? 'default'
                : 'outline'
            }
            onClick={handleViewFavorites}
          >
            Ver favoritos
          </Button>
          <Button
            variant={postButtonStatus === 'all' ? 'default' : 'outline'}
            onClick={handleViewAll}
          >
            Ver Todos
          </Button>
        </div>

        <div className="relative flex flex-col w-full h-[65vh] max-h-[65vh] items-center mt-1 gap-8 justify-around overflow-y-scroll ">
          {filteredPosts.map((post) => (
            <div 
            onClick={() => setSelectedPost(post)}
            key={post.id}>
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              isAdded={favorites.includes(post.id)}
              isSelected={selectedPost.id === post.id}
            />
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex flex-col w-[1100px] h-[515px] justify-between m-auto border rounded-lg shadow-md">
        <SelectedPostCard 
        id={selectedPost.id}
        title={selectedPost.title}
        content={selectedPost.content}
        author={selectedPost.author}
        isAdded={favorites.includes(selectedPost.id)}
        />
      </div>
    </div>
  );
}
