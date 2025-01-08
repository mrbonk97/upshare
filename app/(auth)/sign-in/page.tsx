import { signIn } from "@/auth";

const SignInPage = () => {
  return (
    <main className="h-full flex items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("credentials", { redirectTo: "/folders" });
        }}
        className="flex flex-col gap-5"
      >
        <input type="text" name="username" placeholder="u" />
        <input type="text" name="password_hash" placeholder="p" />
        <button type="submit">Signin with Resend</button>
      </form>
    </main>
  );
};

export default SignInPage;
