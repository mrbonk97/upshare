import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// JWT interface에 id 속성을 추가하기 위한 코드
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (typeof credentials.username != "string") throw new Error("아이디가 없음");
        if (typeof credentials.password != "string") throw new Error("패스워드가 없음");

        const result = await fetch(`http://localhost:3000/api/users/sign-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        if (!result.ok) {
          const data = await result.json();
          throw new Error(data.message);
        }

        const data = await result.json();
        const user = data.data.user;
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && user.id) token.id = user.id;
      return token;
    },

    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
});
