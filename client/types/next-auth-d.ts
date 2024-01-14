import { JWT } from "next-auth/jwt"
import NextAuth, { Account, DefaultSession, User } from "next-auth"

declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      idToken: string;
      accessTokenExpires: number;
      accessToken: any;
      refreshToken: string;
      isNew: boolean;
    }
  }
  
  declare module "next-auth" {
    interface User {
      isNew: boolean;

    }

    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        image: string;
        idToken?: string;
        isNew: boolean;
        firstName: string;
        lastName: string;
        gender: string;
        age: string;
        weight: string;
        height: string;
      }
    }
  }