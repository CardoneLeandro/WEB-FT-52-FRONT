import React from 'react'
import { Button } from '../../../components/ui/button'

interface User{
  id: string
  name: string
  email: string
  status: 'active' | 'partialactive' | 'pending' | 'banned' | 'inactive'
  role: 'user' | 'admin' | 'superadmin'
  image: string
  previousStatus?: string;
}


export default function UsersComponent({props, changeRole, changeStatus}: {props: User, changeRole: (id: string) => void, changeStatus: (id: string) => void}) {

  return (
    <div>
        <div>Nombre: {props.name}</div>
        <div>Email: {props.email}</div>
        <div>Rol: {props.role}</div>
        <div>Status: {props.status}</div>
          <div>
            <Button
             onClick={() => changeRole(props.id)}
             variant={props.role === 'user' ? 'constructive' : 'destructive'}>
              {props.role === 'user' ? 'Volver Admin' : 'Quitar Admin'}
            </Button>
            </div>
            <div>
                <Button
                onClick={() => changeStatus(props.id)} 
                variant={props.status === 'banned' ? 'default' : 'destructive'}>
                    {props.status === 'banned' ?  'Desbanear' : 'Banear'}
                </Button>
            </div>
    </div>
  )
}
