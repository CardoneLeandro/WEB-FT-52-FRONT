import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Añadir accessToken a la sesión
    user: {
      name?: string;
      email?: string;
      image?: string;
      providerAccountId?: string; // Agregar ID de la cuenta del proveedor
      profile?: GoogleProfile; // Añadir el perfil de Google directamente a la sesión
    } & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
    providerAccountId?: string;
    profile?: GoogleProfile; // Añadir el perfil de Google al token
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  
  callbacks: {
    async jwt({ token, account, profile }) {
      // Verificamos si el proveedor es Google y hacemos un narrowing del tipo profile a GoogleProfile
      if (account?.provider === "google" && profile) {
        const googleProfile = profile as GoogleProfile;

        token.accessToken = account.access_token; // Token de acceso de Google
        token.providerAccountId = profile.sub; // ID de Google
        token.profile = googleProfile; // Guardar el perfil de Google en el token
      }

      return token; // Retornamos el token para que persista en la sesión
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined; // Asegurar el tipo de accessToken
      session.user.providerAccountId = token.providerAccountId as string | undefined; // Asegurar el tipo de providerAccountId
      session.user.profile = token.profile as GoogleProfile | undefined; // Asegurar el tipo de perfil de Google

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };





/*
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: (() => {
        const id = process.env.GOOGLE_CLIENT_ID;
        if (!id) {
          throw new Error("GOOGLE_CLIENT_ID is not defined");
        }
        return id;
      })(),
      clientSecret: (() => {
        const secret = process.env.GOOGLE_CLIENT_SECRET;
        if (!secret) {
          throw new Error("GOOGLE_CLIENT_SECRET is not defined");
        }
        return secret;
      })(),
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account?.provider === 'google') {
        token.idToken = account.id_token; // Guardar el id_token en el JWT
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.idToken = token.idToken; // Asegurarse de que el idToken esté disponible en la sesión
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


*/ 

/*
import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          ...profile,
          role: "usuario", // Se asigna un rol por defecto
          id: profile.sub, // 'sub' es el ID único del usuario en Google
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Correo Electrónico', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials: any) {
        // Petición al backend para autenticar credenciales
        const res = await fetch("https://tu-backend.com/api/auth/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // Si el usuario es válido, retornarlo
        } else {
          return null; // Si no es válido, retornar null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === 'credentials') {
        console.log(user);
        return true; // Login con credenciales exitoso
      }

      if (account && account.provider === 'google') {
        const { name, email } = user;
        try {
          const res = await fetch("https://tu-backend.com/api/auth/google", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              email: email,
              role: "usuario",
            }),
          });

          if (res.ok) {
            console.log(user);
            return true; // Si la llamada fue exitosa
          } else {
            return false; // Si la respuesta no fue exitosa
          }
        } catch (error) {
          console.error(error);
          return false; // Error en la llamada
        }
      }

      return true; // Por defecto permitir el inicio de sesión
    },
    // Aquí corregimos la tipificación con los tipos correctos
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role; // Agregar el rol al token
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.role = token.role; // Agregar el rol a la sesión
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

*/