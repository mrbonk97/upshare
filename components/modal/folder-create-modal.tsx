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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Spinner } from "../spinner";
import { createFolderAction } from "@/lib/action/create-folder-action";
import { mutate } from "swr";

const formSchema = z.object({
  curFolderId: z.string().optional(),
  folderName: z
    .string()
    .min(2, { message: "2글자 이상을 입력해주세요" })
    .max(20, { message: "20글자 이하를 입력해주세요" }),
});

interface Props {
  folderId: string | undefined;
  children: React.ReactNode;
}

export const FolderCreateModal = ({ folderId, children }: Props) => {
  const [open, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      folderName: "",
      curFolderId: folderId,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await createFolderAction(
      values.curFolderId,
      values.folderName
    );

    if (result.message == "success") {
      const params = folderId ? `/${folderId}` : "";
      mutate(`/api/folders${params}`);
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(state) => setIsOpen(state)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>폴더 생성</DialogTitle>
          <DialogDescription>현재 경로에 폴더를 생성합니다.</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="pt-5 h-40 flex flex-col justify-between"
            >
              {form.formState.isSubmitting ? (
                <Spinner />
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="curFolderId"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormControl>
                          <Input
                            type="hidden"
                            aria-hidden
                            className="hidden"
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <div className="grid grid-cols-5 gap-2">
                <Button
                  type="submit"
                  className="py-6 col-span-4"
                  disabled={form.formState.isSubmitting}
                >
                  생성
                </Button>
                <DialogClose asChild>
                  <Button
                    variant={"destructive"}
                    className="py-6 col-span-1"
                    disabled={form.formState.isSubmitting}
                  >
                    취소
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
