"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changeFileName, changeFolderName } from "@/lib/api/folder-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Spinner } from "@/components/spinner";
import { Dispatch, SetStateAction } from "react";

interface DeleteMProps {
  type: "FILE" | "FOLDER";
  id: string;
  title: string;
  setIsMenuOn: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "2자 이상 입력해주세요" })
    .max(20, { message: "20자 이하로 입력해주세요." }),
});

export const ChangeTitleM = ({
  type,
  id,
  title,
  setIsMenuOn,
  children,
}: DeleteMProps) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (title: string) => {
      if (type == "FILE") return changeFileName(id, title);
      else return changeFolderName(id, title);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      }),
  });

  const onSubmit = (e: z.infer<typeof formSchema>) => {
    mutate(e.title);
  };

  return (
    <AlertDialog onOpenChange={(e) => setIsMenuOn((cur) => (!e ? false : cur))}>
      <AlertDialogTrigger className="h-full w-full py-1 text-center hover:bg-secondary">
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>파일 이름 변경</AlertDialogTitle>
          <AlertDialogDescription>
            파일(폴더)이름을 변경할 수 있습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isPending ? (
          <div className="h-[120px] flex2">
            <Spinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="py-5">
                    <FormControl>
                      <Input placeholder="파일(폴더)이름" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isPending}>
                  취소하기
                </AlertDialogCancel>
                <Button type="submit" className="w-full" disabled={isPending}>
                  변경하기
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
