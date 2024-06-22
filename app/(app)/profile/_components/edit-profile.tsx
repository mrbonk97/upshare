"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { api } from "@/lib/api";
import useStore from "@/store/store";
import { User } from "@/type/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserImage } from "./user-image";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "2글자 이상 입력해주세요.",
    })
    .max(10, {
      message: "10글자 이하로 입력해주세요.",
    }),
});

export const EditProfile = () => {
  const user = useStore.use.user();
  const signIn = useStore.use.signIn();

  const { mutate, isPending } = useMutation({
    mutationFn: (username: string): Promise<User> =>
      api
        .patch("/users/me/change-name", {
          username,
        })
        .then((res) => res.data),
    onSuccess: (e) => {
      signIn(e);
      toast({
        title: "이름을 변경하였습니다.",
        description: `이름: ${e.username}`,
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
    },
  });

  const onSubmit = (e: z.infer<typeof formSchema>) => {
    mutate(e.username);
  };

  return (
    <article className="p-5 flex2 h-full w-full">
      <Card>
        <CardHeader>
          <CardTitle>프로필 수정</CardTitle>
          <CardDescription>
            이름을 변경하실 수 있습니다. 수정 후 저장 버튼을 눌러주세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mt-5 mb-10">
            <UserImage />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {isPending ? (
                <div className="mb-[86px] w-full flex justify-center">
                  <Spinner />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => {
                    return (
                      <FormItem className="grid grid-cols-4 items-center">
                        <FormLabel className="text-right col-span-1 mr-4 mt-1.5">
                          이름
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="이름을 입력해주세요"
                            className="col-span-3"
                            {...field}
                          />
                        </FormControl>
                        <div className="col-span-4 h-3">
                          <FormMessage />
                        </div>
                      </FormItem>
                    );
                  }}
                />
              )}
              <Button
                className="mt-5 w-full"
                type="submit"
                disabled={isPending}
              >
                저장
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </article>
  );
};
