'use client';
import CreatePost from '@/components/post/createPost';
import React, { useState } from 'react';

function EditEvent() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-6">
        Panel de Administración de Anuncios
      </h1>
      <div className="flex flex-col border rounded-lg shadow ">
        <CreatePost
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />
      </div>
    </div>
  );
}

export default EditEvent;


