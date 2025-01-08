import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
          user = await fetch("http://localhost:3000/api/users/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "asdasd", password: "pass123" }),
          }).then((res) => res.json());
        } catch (e) {
          console.log(e);
        }

        if (!user) {
          throw new Error("오류: [로그인] 실패");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
});
