interface ILoginUser {
    email: string;
    password: string;
    general?: string;
}
interface ILoginError{
    email?: string;
    password?: string;
    general?: string;

}

interface CustomSession {
    user?: {
      name?: string | null;
      email?: string | null;
    };
    accessToken?: string;
    providerAccountId?: string;
  }