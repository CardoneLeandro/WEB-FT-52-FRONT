import NextAuth, { NextAuthOptions, DefaultSession } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

// Extendemos las interfaces para añadir campos personalizados a la sesión y JWT
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

// Definimos las opciones de autenticación
export const authOptions: NextAuthOptions = {
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
      session.accessToken = token.accessToken as string | undefined;
      session.user.providerAccountId = token.providerAccountId as
        | string
        | undefined;
      session.user.profile = token.profile as GoogleProfile | undefined;
      return session;
    },
  },
};

// Aquí exportamos las rutas de API correctamente según Next.js 13+
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
