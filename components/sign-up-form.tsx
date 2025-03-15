"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { handleSignIn } from "@/lib/action";
import { Spinner } from "@/components/spinner";

const formSchema = z
  .object({
    username: z.string().min(4, {
      message: "아이디는 최소 4글자 입니다.",
    }),
    password: z.string().min(4, {
      message: "패스워드는 최소 4글자 입니다.",
    }),
    confirmPassword: z.string({ message: "패스워드가 일치하지 않습니다." }).min(4, {
      message: "패스워드는 최소 4글자 입니다.",
    }),
    isVerified: z.boolean().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "패스워드가 일치하지 않습니다.",
        path: ["confirmPassword"],
      });
    }
  });

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      const result = await fetch("/api/users/sign-up", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (result.ok) {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);
        formData.append("redirectTo", "/folders");
        await handleSignIn(formData);
      } else {
        const body = await result.json();
        form.control.setError("confirmPassword", { type: "custom", message: body.message });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-shrink-0 p-5 md:p-10 mx-auto h-full w-full max-w-96 rounded-xl md:bg-background"
      >
        <div className="flex md:hidden justify-center">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <input name="redirectTo" hidden aria-hidden readOnly value={"/folders"} />
        <h1 className="mt-5 md:mt-0 mb-10 text-2xl font-bold opacity-80">회원가입</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="아이디"
                  {...field}
                  autoCapitalize="none"
                  className="py-6 rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  type="password"
                  placeholder="패스워드"
                  {...field}
                  className="py-6 rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:ring-0 tracking-widest"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  type="password"
                  placeholder="패스워드 확인"
                  className="py-6 rounded-none border-x-0 border-t-0 border-b shadow-none focus-visible:ring-0 tracking-widest"
                  {...field}
                />
              </FormControl>
              <div className="h-5">
                <FormMessage />
              </div>
              <FormDescription className="text-right">4자리 이상</FormDescription>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-16 py-6 w-full bg-blue-400 hover:bg-blue-400/90 rounded-2xl"
        >
          {form.formState.isSubmitting ? <Spinner /> : "회원가입"}
        </Button>
        <p className="mt-5 text-center text-sm font-medium opacity-60">
          계정이 있으시다면{" "}
          <Link className="underline underline-offset-2 hover:font-bold" href={"/sign-in"}>
            로그인
          </Link>
        </p>
        <p className="mt-1.5 text-center text-sm font-medium opacity-60">
          아이디나 패스워드를 잊으셨다면{" "}
          <Link className="underline underline-offset-2 hover:font-bold" href={"/forgot-password"}>
            클릭
          </Link>
        </p>
      </form>
    </Form>
  );
};
