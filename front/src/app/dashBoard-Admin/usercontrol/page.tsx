'use client';

import { useState } from 'react';
import AdminListComponent, {
  Item,
} from '@/components/adminPanel/adminListComponent';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  avatarUrl: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@example.com',
      isActive: true,
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@example.com',
      isActive: false,
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      isActive: true,
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      name: 'Ana López',
      email: 'ana@example.com',
      isActive: true,
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 5,
      name: 'Pedro Sánchez',
      email: 'pedro@example.com',
      isActive: false,
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 6,
      name: 'Laura Martínez',
      email: 'laura@example.com',
      isActive: true,
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
    },
  ]);

  const handleToggleAction = (user: Item) => {
    setUsers(
      users.map((u) =>
        u.id === Number(user.id) ? { ...u, isActive: !u.isActive } : u,
      ),
    );
  };

  const getToggleLabel = (isActive: boolean) =>
    isActive ? 'Banear' : 'Desbanear';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">
            Panel de Administración de Usuarios
          </h1>
        </div>
      </div>
      <div className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <AdminListComponent
              type="user"
              items={users.map((user) => ({
                id: user.id.toString(),
                title: user.name,
                description: user.email,
                isActive: user.isActive,
                avatarUrl: user.avatarUrl,
              }))}
              onToggleAction={handleToggleAction}
              getToggleLabel={getToggleLabel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
