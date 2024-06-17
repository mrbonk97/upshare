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
import { createFolder } from "@/api/folder-api";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const FolderCreateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const folderId = pathname.split("/")[2] || null;
  const { refreshFolder } = useFile();

  const formSchema = z.object({
    title: z
      .string()
      .min(2, {
        message: "2글자 이상 입력해주세요",
      })
      .max(20, {
        message: "20자 이하로 입력해주세요",
      })
      .regex(new RegExp(/^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣_.-]*$/), {
        message: "특수기호는 '-', '_' 만가능합니다.",
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

    if (isSuccess) {
      refreshFolder();
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        setIsOpen(e);
        setTimeout(() => {
          form.reset();
        }, 200);
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button className="w-full md:py-7 md:text-xl bg-purple-p hover:bg-purple-p/90">
          폴더 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>폴더 추가</DialogTitle>
          <DialogDescription>현재 경로에 폴더를 추가합니다.</DialogDescription>
        </DialogHeader>
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
            <DialogFooter>
              <Button type="submit" className="w-full">
                추가
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
