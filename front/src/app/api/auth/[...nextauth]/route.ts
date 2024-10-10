// import NextAuth, { NextAuthOptions, DefaultSession } from 'next-auth';
// import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   return await NextAuth(req, res, authOptions);
// }

// declare module 'next-auth' {
//   interface Session {
//     accessToken?: string; // Añadir accessToken a la sesión
//     user: {
//       name?: string;
//       email?: string;
//       image?: string;
//       providerAccountId?: string; // Agregar ID de la cuenta del proveedor
//       profile?: GoogleProfile; // Añadir el perfil de Google directamente a la sesión
//     } & DefaultSession['user'];
//   }

//   interface JWT {
//     accessToken?: string;
//     providerAccountId?: string;
//     profile?: GoogleProfile; // Añadir el perfil de Google al token
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, account, profile }) {
//       // Verificamos si el proveedor es Google y hacemos un narrowing del tipo profile a GoogleProfile
//       if (account?.provider === 'google' && profile) {
//         const googleProfile = profile as GoogleProfile;

//         token.accessToken = account.access_token; // Token de acceso de Google
//         token.providerAccountId = profile.sub; // ID de Google
//         token.profile = googleProfile; // Guardar el perfil de Google en el token
//       }

//       return token; // Retornamos el token para que persista en la sesión
//     },

//     async session({ session, token }) {
//       session.accessToken = token.accessToken as string | undefined; // Asegurar el tipo de accessToken
//       session.user.providerAccountId = token.providerAccountId as
//         | string
//         | undefined; // Asegurar el tipo de providerAccountId
//       session.user.profile = token.profile as GoogleProfile | undefined; // Asegurar el tipo de perfil de Google

//       return session;
//     },
//   },
// };

import NextAuth, { NextAuthOptions, DefaultSession } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { NextApiRequest, NextApiResponse } from 'next';

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
      session.accessToken = token.accessToken as string | undefined;
      session.user.providerAccountId = token.providerAccountId as
        | string
        | undefined;
      session.user.profile = token.profile as GoogleProfile | undefined;
      return session;
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return await NextAuth(req, res, authOptions);
}
