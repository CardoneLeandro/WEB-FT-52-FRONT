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

// Definir las opciones de autenticación
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
      session.accessToken = token.accessToken;

      // Verificamos si el token tiene providerAccountId y profile para evitar errores de tipo
      if (token.providerAccountId) {
        session.user.providerAccountId = token.providerAccountId;
      }
      if (token.profile) {
        session.user.profile = token.profile as GoogleProfile;
      }

      return session;
    },
  },
};

// Manejadores de las rutas para Next.js 13 API Routes
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
