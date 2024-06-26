"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Spinner } from "@/components/spinner";

import useStore from "@/store/store";
import { File } from "@/type/type";
import { FileUpload } from "@/lib/action/file-action";

const formSchema = z.object({
  file: z
    .any()
    .refine((f) => f?.length == 1, "파일을 선택해주세요")
    .refine((f) => f[0].size <= 5_180_000, "파일의 용량은 최대 5MB입니다."),
});

export const FileUploadModal = () => {
  const folderId = useStore.use.folderId();
  const setMemory = useStore.use.setMemory();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const addFile = useStore.use.addFile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const fileRef = form.register("file");

  const mutation = useMutation({
    mutationFn: (formData: FormData) => FileUpload(formData),
    onSuccess: (file: File) => {
      addFile(file);
      setIsOpen(false);
      queryClient.removeQueries({ queryKey: ["folders", "NORMAL", folderId] });
      queryClient.removeQueries({ queryKey: ["folders", "SEARCH"] });
      setMemory("INCREMENT", file.size);
    },
  });

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("file", e.file[0]);
    if (folderId != "") formData.append("folderId", folderId);
    mutation.mutate(formData);
  };

  return (
    <Dialog
      onOpenChange={(e) => {
        setIsOpen(e);
        setTimeout(() => form.reset(), 100);
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button className="py-6 w-full bg-blue-400/80 hover:bg-blue-400">
          업로드
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>파일 업로드</DialogTitle>
          <DialogDescription>
            업로드 버튼을 클릭해서 추가해주세요(최대 5mb)
          </DialogDescription>
        </DialogHeader>
        {mutation.isPending ? (
          <div className="w-full h-32 flex2">
            <Spinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="w-full">
                  업로드
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
