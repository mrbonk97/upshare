"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderContext } from "../folder-context";
import { Spinner } from "@/components/spinner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "2글자 이상을 입력해주세요" })
    .max(100, { message: "100글자 이하를 입력해주세요" }),
});

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  type: "FILE" | "FOLDER";
  id: number;
  defaultName: string;
}

export const ChangeNameModal = ({ isOpen, closeModal, type, id, defaultName }: Props) => {
  const context = useContext(FolderContext);
  const { toast } = useToast();
  const typeKorean = type == "FILE" ? "파일" : "폴더";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let result = null;
    try {
      if (type == "FILE") {
        result = await fetch(`/api/files/${id}`, {
          body: JSON.stringify({ name: values.name }),
          method: "PATCH",
        });
      }
      if (type == "FOLDER") {
        result = await fetch(`/api/folders/${id}`, {
          body: JSON.stringify(values),
          method: "PATCH",
        });
      }
      if (!result || !result.ok) {
        throw new Error("이름 변경 실패");
      }
      if (result.ok) {
        await context.revalidate();
        toast({ title: "폴더 이름 변경 성공" });
        closeModal();
      }
    } catch (e) {
      console.log(e);
      toast({ variant: "destructive", title: "이름 변경 실패" });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => form.reset()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>이름 변경</AlertDialogTitle>
          <AlertDialogDescription>{typeKorean} 이름을 변경할 수 있습니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="이름을 입력해주세요"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className="mt-5">
              <AlertDialogCancel onClick={closeModal} disabled={form.formState.isSubmitting}>
                취소
              </AlertDialogCancel>
              <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
                {form.formState.isSubmitting ? <Spinner /> : "변경"}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
