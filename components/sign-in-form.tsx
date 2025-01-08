"use server";
import { signIn } from "@/auth";

export const SignInForm = () => {
  return (
    <form action={async (formData) => {}}>
      <input type="text" name="username" placeholder="u" />
      <input type="text" name="password_hash" placeholder="p" />
      <button type="submit">Signin with Resend</button>
    </form>
  );
};
