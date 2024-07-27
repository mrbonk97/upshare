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
import { Spinner } from "@/components/spinner";
import { useRef } from "react";
import { uploadFile } from "@/lib/api/folder-api";
import useStore from "@/store/store";

const formSchema = z.object({
  file: z
    .any()
    .refine((f) => f?.length == 1, "파일을 선택해주세요")
    .refine((f) => f[0].size <= 10_245_000, "파일의 용량은 최대 10MB입니다."),
});

export const FileUploadM = () => {
  const qc = useQueryClient();
  const folderId = useStore.use.folderId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => uploadFile(formData),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders"] });
      buttonRef.current?.click();
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("file", values.file[0]);
    if (folderId) formData.append("folderId", folderId);
    mutate(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          ref={buttonRef}
          className="py-6 w-full bg-blue-400/80 hover:bg-blue-400"
        >
          업로드
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>파일 업로드</DialogTitle>
          <DialogDescription>
            업로드 버튼을 클릭해서 추가해주세요(최대 10mb)
          </DialogDescription>
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
                name="file"
                render={({ field }) => (
                  <FormItem className="py-5">
                    <FormControl>
                      <Input type="file" {...form.register("file")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <Button type="submit" disabled={isPending} className="w-full">
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
