"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/lib/api/folder-api";
import { useRef } from "react";
import { Spinner } from "@/components/spinner";
import useStore from "@/store/store";

const formSchema = z.object({
  folderName: z
    .string()
    .min(2, { message: "2자 이상 입력해주세요" })
    .max(20, { message: "20자 이하로 입력해주세요." }),
});

export const FolderCreateM = () => {
  const folderId = useStore.use.folderId();
  const qc = useQueryClient();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (folderName: string) => createFolder(folderName, folderId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders"] });
      buttonRef.current?.click();
    },
  });

  const onSubmit = (e: z.infer<typeof formSchema>) => {
    mutate(e.folderName);
  };

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button
          ref={buttonRef}
          className="py-6 w-full bg-blue-400/80 hover:bg-blue-400"
        >
          폴더 생성
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>폴더 생성</DialogTitle>
          <DialogDescription>해당 위치에 폴더를 생성합니다.</DialogDescription>
        </DialogHeader>
        {isPending ? (
          <div className="h-36 flex2">
            <Spinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="folderName"
                render={({ field }) => (
                  <FormItem className="py-5">
                    <FormControl>
                      <Input placeholder="폴더이름" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <Button className="w-full" disabled={isPending}>
                  만들기
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
