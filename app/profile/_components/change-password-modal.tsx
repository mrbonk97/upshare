"use client";
import { Spinner } from "@/components/spinner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

const formSchema = z
  .object({
    originalPassword: z.string().min(4, {
      message: "패스워드는 최소 4글자 입니다.",
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

export const ChangePasswordModal = () => {
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    try {
      const result = await fetch("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          originalPassword: values.originalPassword,
          password: values.password,
        }),
      }).then((res) => res.json());
      if (result.code == "error") {
        setError(result.message);
        toast({ variant: "destructive", title: "패스워드 변경 실패" });
        form.reset();
      }

      if (result.code == "success") {
        toast({ title: "패스워드 변경에 성공했습니다." });
        form.reset();
        setIsOpen(false);
      }
    } catch (e) {
      if (e instanceof Error)
        toast({ variant: "destructive", title: "패스워드 변경 실패", description: e.message });
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        setError("");
        setIsOpen((cur) => !cur);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button className="py-5 w-full">패스워드 변경</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>패스워드 변경</AlertDialogTitle>
          <AlertDialogDescription>사용자의 패스워드를 변경할 수 있습니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="originalPassword"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      type="password"
                      placeholder="기존 패스워드"
                      {...field}
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
                      placeholder="새로운 패스워드"
                      {...field}
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="mt-5 font-medium text-sm text-center text-destructive">{error}</p>
            <AlertDialogFooter className="pt-5">
              <AlertDialogCancel disabled={form.formState.isSubmitting}>취소</AlertDialogCancel>
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting ? <Spinner /> : <span>변경</span>}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
