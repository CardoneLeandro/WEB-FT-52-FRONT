'use client';

import { useState, useEffect } from 'react';
import AdminListComponent, {
  Item,
} from '@/components/adminPanel/adminListComponent';
import { useAuth } from '@/context/AuthContext';
import UsersComponent from './usersComponent';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'partialactive' | 'pending' | 'banned' | 'inactive'; // Cambiado a valores específicos
  role: 'user' | 'admin' | 'superadmin';
  image: string;
  previousStatus?: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [nameFilter, setNameFilter] = useState('');
  const { userSession, token } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3003/auth/user/get/all', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched users:', data);
        setUsers(data);
        // setFilteredUsers(data);
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

  const handleToggleAction = async (id: string) => {
    const currentUser = users.find((u) => u.id === id);
  
    if (!currentUser) {
      console.error('User not found');
      return;
    }
  
    // Cambiar status correctamente, asegurándose de que sea un valor válido
    const newStatus: 'active' | 'partialactive' | 'pending' | 'banned' | 'inactive' =
      currentUser.status === 'banned'
        ? (currentUser.previousStatus as 'active' | 'partialactive' | 'pending' | 'banned' | 'inactive')
        : 'banned';
  
    try {
      const response = await fetch(
        `http://localhost:3003/auth/user/ban/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const updatedUser = {
          ...currentUser,
          status: newStatus, // Asegúrate de que el status sea un valor válido
          previousStatus: currentUser.status,
        };
  
        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === id ? updatedUser : u))
        );
        setFilteredUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === id ? updatedUser : u))
        );
      } else {
        console.error('Error updating user status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleToggleAdminRole = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3003/auth/user/role/administrator/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const user = await response.json();
        // Realiza las actualizaciones correspondientes
      } else {
        console.error('Error updating user admin role:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user admin role:', error);
    }
  };

  const getToggleLabel = (userStatus: string) =>
    userStatus === 'banned' ? 'Desbannear' : 'Banear';

  const getAdminToggleLabel = (isAdmin: boolean) =>
    isAdmin ? 'Quitar Admin' : 'Hacer Admin';

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

            <div>
              {filteredUsers.map((user) => (
                <UsersComponent
                  key={user.id}
                  props={user}
                  changeRole={handleToggleAdminRole}
                  changeStatus={handleToggleAction}
                />
            ))}
          </div>

          </div>
          </div>
        </div>
      </div>
    );
  }
  


            {/* <AdminListComponent
              type="user"
              items={filteredUsers.map((user) => ({
                id: user.id.toString(),
                title: user.name,
                description: user.email,
                isActive: user.status !== 'banned',
                avatarUrl: user.avatarUrl,
                status: user.status,
                isAdmin: user.isAdmin,
              }))}
              onToggleAction={handleToggleAction}
              onToggleAdminRole={handleToggleAdminRole}
              getToggleLabel={getToggleLabel}
              getAdminToggleLabel={getAdminToggleLabel}
            /> */}
          