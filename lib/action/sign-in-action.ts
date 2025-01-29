"use server";

import { signIn } from "@/auth";

export async function handleSignIn(formData: FormData) {
  return await signIn("credentials", formData);
}
