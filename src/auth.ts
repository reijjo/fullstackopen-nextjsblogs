import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, credentials.username as string),
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
          token: user.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.userId = user.id;
        token.token = user.token;
      }

      if (trigger === "update" && token.userId) {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, Number(token.userId)),
        });

        token.token = dbUser?.token ?? null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token as string | null;
      }
      return session;
    },
  },
});
