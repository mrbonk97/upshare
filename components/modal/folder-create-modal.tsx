"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useFile } from "@/context/file-context";
import { usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createFolder } from "@/api/folder-api";

export const FolderCreateModal = () => {
  const pathname = usePathname();
  const folderId = pathname.split("/home/")[1];
  const { refreshFolder } = useFile();

  const formSchema = z.object({
    title: z
      .string()
      .min(2, {
        message: "2글자 이상 입력해주세요",
      })
      .max(20, {
        message: "20자 이하로 입력해주세요",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    const isSuccess = await createFolder({
      title: e.title,
      folderId: folderId,
    });
    if (isSuccess) refreshFolder();
    form.reset();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full py-7 flex2 gap-5 text-xl">폴더 추가</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>폴더 추가</AlertDialogTitle>
          <AlertDialogDescription>
            현재 경로에 폴더를 추가합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="폴더 이름을 입력해주세요"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  form.reset();
                }}
              >
                취소
              </AlertDialogCancel>
              <AlertDialogAction type="submit">추가</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
