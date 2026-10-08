import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      token?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    token?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string | null;
  }
}
