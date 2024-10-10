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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'partialactive' | 'pending' | 'banned' | 'inactive';
  role: 'user' | 'admin' | 'superadmin';
  image: string;
  previousStatus?: string;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'active' | 'inactive'
  >('all');
  const [nameFilter, setNameFilter] = useState('');
  const { userSession, token, logout } = useAuth();

  const fetchUsers = async () => {
    try {
      console.log('Funcion fetchUsers', token);
      const response = await fetch('http://localhost:3003/auth/user/get/all', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
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

    const newStatus:
      | 'active'
      | 'partialactive'
      | 'pending'
      | 'banned'
      | 'inactive' =
      currentUser.status === 'banned'
        ? (currentUser.previousStatus as
            | 'active'
            | 'partialactive'
            | 'pending'
            | 'banned'
            | 'inactive')
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
        },
      );

      // if (response.status === 441) {
      //   toast.error(`Su cuenta ah sido suspendida, por favor contactarse con nosotros via Email`)
      //   logout()
      //   signOut({ callbackUrl: '/' });
      // }

      if (response.ok) {
        const updatedUser = {
          ...currentUser,
          status: newStatus,
          previousStatus: currentUser.status,
        };

        setUsers((prevUsers) =>
          prevUsers.map((u) => (u.id === id ? updatedUser : u)),
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

      if (response.status === 441) {
        toast.error(`Su cuenta ah sido suspendida, por favor contactarse con nosotros via Email`)
        logout()
        signOut({ callbackUrl: '/' });
      }

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === id ? { ...u, role: updatedUser.role } : u,
          ),
        );
      } else {
        console.error('Error updating user admin role:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user admin role:', error);
    }
  };

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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Panel de Administración de Usuarios
      </h1>
      <div className="flex space-x-4 mb-6">
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as 'all' | 'active' | 'inactive')
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Baneados</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Buscar por nombre"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-lg shadow">
        <ScrollArea className="h-[70vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        className="w-full"
                        variant={
                          user.status === 'banned' ? 'default' : 'destructive'
                        }
                        onClick={() => handleToggleAction(user.id)}
                      >
                        {user.status === 'banned' ? 'Desbanear' : 'Banear'}
                      </Button>
                      <Button
                        className="w-full"
                        variant={
                          user.role === 'admin' ? 'destructive' : 'default'
                        }
                        onClick={() => handleToggleAdminRole(user.id)}
                      >
                        {user.role === 'admin' ? 'Quitar Admin' : 'Hacer Admin'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
