'use client';

import { useState } from 'react';
import AdminListComponent, {
  Item,
} from '@/components/adminPanel/adminListComponent';
import { useAuth } from '@/context/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  avatarUrl: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const { userSession } = useAuth();

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
