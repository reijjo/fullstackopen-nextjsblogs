"use server";

import { revalidatePath } from "next/cache";
import { createToken } from "../services/me";

type TokenFormState = {
  success: boolean;
};

export const generateToken = async (): Promise<TokenFormState> => {
  await createToken();

  revalidatePath("/me");
  return { success: true };
};
