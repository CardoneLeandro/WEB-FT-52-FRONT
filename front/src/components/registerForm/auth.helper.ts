interface IUser {
  id: number;
  name: string;
  email: string;
}
interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export async function register(
  dataNewUser: IRegisterUser,
  setToken: (token: string) => void,
  setSession: (user: IUser) => void,
  redirect: { push: (path: string) => void },
) {
  const APIURL = process.env.NEXT_PUBLIC_API_URL_POST_USER;

  try {
    const response = await fetch(`${APIURL}`, {
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
