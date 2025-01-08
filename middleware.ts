export { auth as middleware } from "@/auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./app/actions";
import { signInAction } from "./app/actions/user/sign-in-action";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password);
        const pwHash = credentials.password;

        // logic to verify if the user exists
        try {
          // user = signInAction(credentials.username, pwHash);
          user = signInAction("asdasd", "asasd");
        } catch (e) {
          console.log(e);
        }

        // if (!user) {
        // No user found, so this is their first attempt to login
        // Optionally, this is also the place you could do a user registration
        // throw new Error("Invalid credentials.");
        // }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
