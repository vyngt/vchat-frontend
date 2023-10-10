import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const TOKEN_ENDPOINT = `${process.env.BACKEND_URL}/auth/token`;
const REFRESH_ENDPOINT = `${process.env.BACKEND_URL}/auth/refresh`;
const ME_ENDPOINT = `${process.env.BACKEND_URL}/users/me`;
const DURATION = Number(process.env.ACCESS_TOKEN_DURATION);

interface BackendToken {
  access_token: string;
  refresh_token: string;
}

interface BackendMeInfo {
  id: number;
  username: string;
  name: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "VChat",
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const body = {
          username: credentials?.email as string,
          password: credentials?.password as string,
        };

        const response = await fetch(TOKEN_ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          return null;
        }

        const data: BackendToken = await response.json();

        const jwt = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };

        const userinfo_response = await fetch(ME_ENDPOINT, {
          method: "GET",
          headers: { Authorization: `Bearer ${jwt.access_token}` },
        });

        if (!userinfo_response.ok) {
          return null;
        }

        const userinfo: BackendMeInfo = await userinfo_response.json();
        const user = {
          id: userinfo.id.toString(),
          name: userinfo.username,
          username: userinfo.name,
          ...jwt,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          user: {
            name: user.name,
            username: user.username,
          },
          access_token: user.access_token,
          expires_at: Math.floor(Date.now() / 1000 + DURATION),
          refresh_token: user.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const body = {
            refresh_token: token.refresh_token,
          };

          const response = await fetch(REFRESH_ENDPOINT, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            method: "POST",
          });

          const tokens: BackendToken = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + DURATION),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },

    async session({ session, token }) {
      session.error = token.error;
      session.access_token = token.access_token;
      session.user = token.user;
      return session;
    },
  },
};
