import { NextApiHandler } from "next";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null
};


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8000/api/auth/login/", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const data = await res.json()
        if (res.ok && data?.access_token) {
          const user: User = {
            name: data.user.username,
            email: data.user.email,
            id: data.user.userId,
            image: null

          };
          return user;
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: "bMFZFfDdzpgqlcQZklCdPldjAWAiMxfNZCIHvTtfHhSLyukxLz%",
  callbacks: {
    async session({ session, token }) {
        if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async signIn({ user }) {
      return !!user;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

export default (req: any, res: any) => NextAuth(req, res, authOptions) as NextApiHandler;
