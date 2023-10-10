import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name?: string;
      username?: string;
    };
    access_token?: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
    access_token?: string;
  }
  interface User {
    name: string;
    username: string;
    access_token: string;
    refresh_token: string;
  }
}
