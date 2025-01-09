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
        let user = null;
        const username = credentials.username;
        const pwHash = credentials.password;
        if (typeof username != "string") throw new Error("아이디가 없음");
        if (typeof pwHash != "string") throw new Error("패스워드가 없음");

        try {
          user = await fetch("http://localhost:3000/api/users/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              pwHash,
            }),
          }).then((res) => res.json());
          console.log("로그인 성공 유저:", user.id);
        } catch (e) {
          console.log(e);
        }

        if (!user) throw new Error("유저 정보가 없음");
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
