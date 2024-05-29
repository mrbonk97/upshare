"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";
import { foldersApi } from "@/api/folders-api";
import { usePathname } from "next/navigation";

export const FolderCreateModal = () => {
  const pathname = usePathname();
  const folderId = pathname.split("/home/")[1];
  const fileContext = useFile();
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2).max(20),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    const isSuccess = await foldersApi.createFolder({
      title: e.title,
      folderId: folderId,
    });

    if (isSuccess) {
      const result = await foldersApi.getFolder(folderId);
      if (result.status == 200) {
        fileContext.setFiles(result.data.files);
        setIsOpen(false);
      }
    }
  };

  return (
    <Dialog onOpenChange={(e) => setIsOpen(e)} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="w-full py-7 flex2 gap-5 text-xl">폴더 추가</Button>
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
