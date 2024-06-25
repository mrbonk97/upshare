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
import { useState } from "react";
import useStore from "@/store/store";
import { FolderCreate } from "@/lib/action/file-action";

const formSchema = z.object({
  folderName: z
    .string()
    .min(2, { message: "2자 이상 입력해주세요" })
    .max(20, { message: "20자 이하로 입력해주세요." }),
});

export const FolderCreateModal = () => {
  const folderId = useStore.use.folderId();
  const addFile = useStore.use.addFile();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: ({
      folderName,
      parentFolderId,
    }: {
      folderName: string;
      parentFolderId?: string;
    }) => FolderCreate(folderName, parentFolderId),
    onSuccess: (e) => {
      addFile(e);
      setIsOpen(false);
      queryClient.removeQueries({ queryKey: ["folders", "NORMAL", folderId] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
    },
  });

  const onSubmit = (e: z.infer<typeof formSchema>) => {
    console.log(folderId);
    mutation.mutate({
      folderName: e.folderName,
      parentFolderId: folderId != "" ? folderId : undefined,
    });
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        setIsOpen(e);
        form.reset();
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button className="py-6 w-full bg-blue-400/80 hover:bg-blue-400">
          폴더 생성
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>폴더 생성</DialogTitle>
          <DialogDescription>해당 위치에 폴더를 생성합니다.</DialogDescription>
        </DialogHeader>
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
              <Button className="w-full" disabled={mutation.isPending}>
                만들기
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
