"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getUserByUsername } from "../services/users";

type RegisterFormState = {
  errors?: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
  };
  values?: {
    username: string;
    name: string;
    password: string;
    passwordConfirm: string;
  };
};

export const registerUser = async (
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const errors: RegisterFormState["errors"] = {};

  if (!username || username.length < 4) {
    errors.username = "Username must have at least 4 characters.";
  }

  if (!name || name.length < 4) {
    errors.name = "Name must have at least 4 characters.";
  }

  if (!password || password.length < 4) {
    errors.password = "Password must have at least 4 characters.";
  }

  if (!passwordConfirm || passwordConfirm !== password) {
    errors.passwordConfirm = "Passwords doesnt match.";
  }

  const isUsernameTaken = await getUserByUsername(username);
  if (isUsernameTaken) {
    errors.username = "Username already in use.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: {
        username,
        name,
        password,
        passwordConfirm,
      },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};
