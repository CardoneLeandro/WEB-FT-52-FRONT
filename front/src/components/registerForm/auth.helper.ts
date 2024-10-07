export async function register(dataNewUser: IRegisterUser, setToken: (token: string) => void, setSession: (user: any) => void, redirect: any) {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;

  try {
    const response = await fetch(`http://localhost:${PORT}/users/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataNewUser),
    });

    if (response.status !== 201) {
      window.alert('Error en la respuesta del servidor');
      redirect.push('/login');
      return;
    }

    const data = await response.json();

    console.log('Datos enviados exitosamente al backend.', data);
    setToken(data.token);
    setSession(data.user);
    redirect.push('/');
  } catch (error) {
    console.error('Error al enviar los datos al backend:', error);
    throw error;
  }
}
