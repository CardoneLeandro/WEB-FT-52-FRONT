import 'next-auth';
import { DefaultSession } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      name?: string;
      email?: string;
      image?: string;
      providerAccountId?: string;
      profile?: GoogleProfile;
    } & DefaultSession['user'];
  }

  interface JWT {
    accessToken?: string;
    providerAccountId?: string;
    profile?: GoogleProfile;
  }
}
