import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

// Extender las interfaces para personalizar la sesión y el JWT
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      name?: string;
      email?: string;
      image?: string;
      providerAccountId?: string;
      profile?: GoogleProfile;
    };
  }

  interface JWT {
    accessToken?: string;
    providerAccountId?: string;
    profile?: GoogleProfile;
  }
}

// Verificar si las variables de entorno están configuradas
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    'Las variables de entorno GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET deben estar configuradas',
  );
}

// Definir las opciones de autenticación
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === 'google' && profile) {
        const googleProfile = profile as GoogleProfile;
        token.accessToken = account.access_token;
        token.providerAccountId = profile.sub;
        token.profile = googleProfile;
      }
      return token;
    },

    async session({ session, token }) {
      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }

      if (typeof token.providerAccountId === 'string') {
        session.user.providerAccountId = token.providerAccountId;
      }

      if (token.profile) {
        session.user.profile = token.profile as GoogleProfile;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string, // Asegúrate de configurar esta variable de entorno
  pages: {
    signIn: '/signin', // Página de inicio de sesión
    signOut: '/signout', // Página de cierre de sesión
    error: '/error', // Página de error
  },
};

// Manejadores de las rutas para Next.js 13 API Routes
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
