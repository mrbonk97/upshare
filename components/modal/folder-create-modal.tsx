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
import { api } from "@/lib/api";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const FolderCreateModal = () => {
  const pn = usePathname();
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
    const parentId = pn.split("/home/")[1];
    const response = await api.post("/folders", {
      title: e.title,
      parentFolderId: parentId,
    });
    if (response.status == 200) {
      console.log("폴더 추가 완료");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full py-7 flex2 gap-5 text-xl">폴더 추가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>폴더 추가</DialogTitle>
          <DialogDescription>현재 경로에 폴더를 추가합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => onSubmit(e))}
            className="space-y-8"
          >
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
