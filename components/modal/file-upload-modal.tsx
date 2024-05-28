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

export const FileUploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formSchema = z.object({
    file: z.unknown().refine((f) => f?.length == 1, "파일을 선택해주세요"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    let formData = new FormData();
    formData.append("file", e.file[0]);
    const result = await api.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (result.status == 200) {
      setIsOpen(false);
    }
  };

  const fileRef = form.register("file");

  return (
    <Dialog onOpenChange={(e) => setIsOpen(e)} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="w-full py-7 flex2 gap-5 text-xl">파일 업로드</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>파일 업로드</DialogTitle>
          <DialogDescription>
            업로드 버튼을 클릭해서 추가해주세요(최대 5mb)
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => onSubmit(e))}
            className="space-y-8"
          >
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
      </DialogContent>
    </Dialog>
  );
};
