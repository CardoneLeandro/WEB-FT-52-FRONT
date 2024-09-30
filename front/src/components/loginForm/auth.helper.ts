'use client';

import { useAuth } from '@/context/AuthContext';

const API_URL_USER_POST = process.env.NEXT_PUBLIC_API_URL_POST_USER_AUT;

interface IUserObject {
  providerAccountId: string;
  email: string;
  name: string;
  accessToken: string;
  image: string;
}

const { setToken, setSession } = useAuth();

export const postUserSessionData = async (userObject: IUserObject) => {
  try {
    const response = await fetch('http://localhost:3005/auth/auth0/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObject),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    console.log('Datos enviados exitosamente al backend.', data);
    setToken(data.token);
    setSession(data.user);
    return data;
  } catch (error) {
    console.error('Error al enviar los datos al backend:', error);
    throw error;
  }
};
