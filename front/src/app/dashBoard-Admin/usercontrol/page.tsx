'use client';

import { useState, useEffect } from 'react';
import AdminListComponent, {
  Item,
} from '@/components/adminPanel/adminListComponent';
import { useAuth } from '@/context/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  status: string; // Actual estado del usuario (ACTIVE, BANNED, etc.)
  previousStatus?: string; // Guardará el estado anterior antes de ser baneado
  avatarUrl: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [nameFilter, setNameFilter] = useState('');
  const { userSession } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3003/users', {
        headers: {},
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched users:', data); // Depuración
        setUsers(data);
        setFilteredUsers(data);
      } else {
        console.error('Error fetching users:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchUsers();
    }
  }, [userSession]);

  const handleToggleAction = async (user: Item) => {
    const currentUser = users.find((u) => u.id === user.id);

    if (!currentUser) {
      console.error('User not found'); // Depuración
      return;
    }

    const newStatus =
      currentUser.status === 'banned'
        ? currentUser.previousStatus || 'active' // Restaurar estado previo
        : 'banned'; // Bannear usuario

    try {
      console.log(`Changing status for user ${user.id} to ${newStatus}`); // Depuración
      const response = await fetch(
        `http://localhost:3003/auth/user/ban/${user.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        console.log('Status updated successfully'); // Depuración
        setUsers(
          users.map((u) =>
            u.id === user.id
              ? { ...u, status: newStatus, previousStatus: currentUser.status }
              : u,
          ),
        );
      } else {
        console.error('Error updating user status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const getToggleLabel = (userStatus: string) =>
    userStatus === 'banned' ? 'Desbannear' : 'Banear';

  useEffect(() => {
    const filtered = users
      .filter((user) => {
        if (statusFilter === 'active')
          return user.status === 'active' || user.status === 'partialactive';
        if (statusFilter === 'inactive') return user.status === 'banned';
        return true;
      })
      .filter((user) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase()),
      );

    setFilteredUsers(filtered);
  }, [statusFilter, nameFilter, users]);

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
          <div className="max-w-4xl mb-4">
            <div className="flex space-x-4 mb-6">
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as 'all' | 'active' | 'inactive',
                  )
                }
                className="p-2 border rounded-md"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Baneados</option>
              </select>

              <input
                type="text"
                placeholder="Buscar por nombre"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>

            <AdminListComponent
              type="user"
              items={filteredUsers.map((user) => ({
                id: user.id.toString(),
                title: user.name,
                description: user.email,
                isActive: user.status !== 'banned', // Actualiza con el nuevo campo de estado
                avatarUrl: user.avatarUrl,
              }))}
              onToggleAction={handleToggleAction}
              getToggleLabel={(user) => getToggleLabel(user.status)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
