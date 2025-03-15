"use client";

import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FolderContext } from "../folder-context";
import { Spinner } from "@/components/spinner";

const formSchema = z.object({
  curFolderId: z.string().optional(),
  folderName: z
    .string()
    .min(2, { message: "2글자 이상을 입력해주세요" })
    .max(20, { message: "20글자 이하를 입력해주세요" }),
});

interface Props {
  children: React.ReactNode;
}

export const FolderCreateModal = ({ children }: Props) => {
  const context = useContext(FolderContext);
  const folderId = context.getFolderId();
  const { toast } = useToast();
  const [open, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
      curFolderId: folderId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await fetch("/api/folders", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (result.ok) {
        await context.revalidate();
        toast({ title: "폴더 생성 성공" });
        setIsOpen(false);
      }
    } catch (e) {
      console.log(e);
      toast({ variant: "destructive", title: "[오류] 폴더 생성 실패" });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        setIsOpen(state);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>폴더 생성</DialogTitle>
          <DialogDescription>현재 경로에 폴더를 생성합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <>
              <FormField
                control={form.control}
                name="curFolderId"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input
                        aria-hidden
                        type="hidden"
                        className="hidden"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="folderName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="폴더 명을 입력해주세요"
                        autoComplete="off"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            <DialogFooter className="mt-5 gap-5 sm:gap-0">
              <DialogClose asChild>
                <Button variant={"outline"} disabled={form.formState.isSubmitting}>
                  취소
                </Button>
              </DialogClose>
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Spinner /> : "생성"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
