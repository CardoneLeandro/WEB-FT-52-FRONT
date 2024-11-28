'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Post } from '@/context/AuthContext';

const port = process.env.NEXT_PUBLIC_APP_API_PORT;

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {token, logout } = useAuth();
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3003/auth/post/get/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching events');
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('No se pudieron cargar los anuncios.');
      toast.error('Error al cargar los anuncios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleUpdatePost = async (updatedPost: Partial<Post>) => {
    try {
        const {id, ...params} = updatedPost
      const response = await fetch(
        `http://localhost:${port}/auth/post/edit/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        },
      );

      if (response.status === 441) {
        toast.error(
          `Su cuenta ha sido suspendida, por favor contáctese con nosotros via Email`,
        );
        logout();
        signOut({ callbackUrl: '/' });
        return;
      }

      if (!response.ok) {
        toast.error('Error al editar el anuncio');
        return;
      }

      const updatedPostData = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === updatedPostData.id ? updatedPostData : post
        )
      );
      setEditingPost(null); // Cierra el modal de edición
      toast.success('anuncio actualizado correctamente');
    } catch (err) {
      toast.error('No se pudo actualizar el anuncio.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Panel de Administración de Anuncios
      </h1>
      {loading ? (
        <p>Cargando Anuncios...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="border rounded-lg shadow">
          <ScrollArea className="h-[70vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Accion</TableHead>
                  <TableHead>Eliminar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>{post.title}</TableCell>
                    <TableCell>
                      <div className="flex justify-start space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-1/4"
                              onClick={() => setEditingPost(post)}
                            >
                              Editar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Editar Anuncio</DialogTitle>
                            </DialogHeader>
                            {editingPost && (
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="title">Título</Label>
                                  <Input
                                    id="title"
                                    value={editingPost.title}
                                    onChange={(e) =>
                                      setEditingPost({
                                        ...editingPost,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="content">Contenido</Label>
                                  <Textarea
                                    id="description"
                                    value={editingPost.content}
                                    onChange={(e) =>
                                      setEditingPost({
                                        ...editingPost,
                                        content: e.target.value,
                                      })
                                    }
                                  />
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="constructive"
                                    onClick={() =>
                                      handleUpdatePost(editingPost)
                                    }
                                  >
                                    Guardar
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => setEditingPost(null)}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          post.status === 'active'
                            ? handleUpdatePost({
                                newStatus: 'inactive',
                                id: post.id,
                              })
                            : handleUpdatePost({
                                newStatus: 'active',
                                id: post.id,
                              });
                        }}
                        variant={
                          post.status === 'active'
                            ? 'destructive'
                            : 'constructive'
                        }
                      >
                        {post.status === 'active' ? 'Ocultar' : 'Mostrar'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
