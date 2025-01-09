import { auth, signIn } from "@/auth";

const SignInPage = async () => {
  return (
    <main className="h-full flex items-center justify-center">
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
        className="flex flex-col gap-5"
      >
        <input
          readOnly
          aria-hidden
          type="hidden"
          name="redirectTo"
          value={"/folders"}
        />
        <input type="text" name="username" placeholder="u" />
        <input type="text" name="password" placeholder="p" />
        <button type="submit">Signin with Resend</button>
      </form>
    </main>
  );
};

export default SignInPage;
