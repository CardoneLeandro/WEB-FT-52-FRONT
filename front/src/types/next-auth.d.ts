// src/types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      idToken?: string; // Agrega idToken aquí
    } & DefaultUser;
  }

  interface JWT {
    idToken?: string; // Agrega idToken aquí
  }
}
import 'next-auth';

declare module 'next-auth' {
  interface SignInResponse {
    idToken?: string; // Añadir idToken al tipo
  }
}