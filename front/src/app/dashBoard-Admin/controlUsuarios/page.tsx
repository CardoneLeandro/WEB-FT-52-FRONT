'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Ban, CheckCircle } from 'lucide-react'

interface User {
  id: number
  name: string
  email: string
  isBanned: boolean
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', isBanned: false },
    { id: 2, name: 'María García', email: 'maria@example.com', isBanned: true },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      isBanned: false,
    },
  ])

  const handleBanUser = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isBanned: true } : user,
      ),
    )
  }

  const handleUnbanUser = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isBanned: false } : user,
      ),
    )
  }

  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-5'>
        Panel de Administración de Usuarios
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isBanned ? (
                  <span className='text-red-500'>Baneado</span>
                ) : (
                  <span className='text-green-500'>Activo</span>
                )}
              </TableCell>
              <TableCell>
                {user.isBanned ? (
                  <Button
                    onClick={() => handleUnbanUser(user.id)}
                    variant='outline'
                    size='sm'
                    className='flex items-center'
                  >
                    <CheckCircle className='mr-2 h-4 w-4' />
                    Desbanear
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleBanUser(user.id)}
                    variant='outline'
                    size='sm'
                    className='flex items-center text-red-500 hover:text-red-700'
                  >
                    <Ban className='mr-2 h-4 w-4' />
                    Banear
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
