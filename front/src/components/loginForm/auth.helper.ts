'use client';

import { useAuth } from '@/context/AuthContext';

interface IUserObject {
  providerAccountId: string;
  email: string;
  name: string;
  accessToken: string;
  image: string;
}

// Función para enviar los datos del usuario
export const postUserSessionData = async (userObject: IUserObject) => {
  try {
    const response = await fetch(
      'https://web-ft-52-back-1.onrender.com/auth/auth0/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObject),
      },
    );

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    console.log('Datos enviados exitosamente al backend.', data);

    return data;
  } catch (error) {
    console.error('Error al enviar los datos al backend:', error);
    throw error;
  }
};

// Hook personalizado para manejar la sesión
export const usePostUserSession = () => {
  const { setToken, setSession } = useAuth();

  const handlePostUserSession = async (userObject: IUserObject) => {
    try {
      const data = await postUserSessionData(userObject);
      setToken(data.token); // Establece el token de autenticación
      setSession(data.user); // Establece la sesión del usuario
    } catch (error) {
      console.error('Error al manejar la sesión del usuario:', error);
    }
  };

  return { handlePostUserSession };
};
