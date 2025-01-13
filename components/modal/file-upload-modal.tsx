"use client";

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import { CloudUploadIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  children: React.ReactNode;
}

const formSchema = z.object({
  file: z.instanceof(FileList).optional(),
});

export const FileUploadModal = ({ children }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleRemove = () => {
    const dataTransfer = new DataTransfer(); // 새 FileList 생성
    const fileList = form.getValues("file");
    if (!fileList) return;

    Array.from(fileList).forEach((file, index) => {
      if (index !== 1) {
        dataTransfer.items.add(file); // 제외할 파일을 건너뛰고 추가
      }
    });

    form.setValue("file", dataTransfer.files);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>파일 업로드</DialogTitle>
          <DialogDescription>현재 경로에 파일을 추가합니다.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-full h-40 border-2 border-dashed rounded-xl cursor-pointer flex2 flex-col">
                    <CloudUploadIcon size={72} className="text-blue-400" />
                    <p className="text-center text-lg font-semibold opacity-80">
                      파일을 선택해주세요
                    </p>
                    <p className="text-center text-xs font-medium opacity-60">
                      최대 20MB까지 가능
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      aria-hidden
                      className="hidden"
                      {...fileRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => handleRemove()}>
              히히
            </Button>
            <ul className="mt-5 space-y-2">
              {form.getValues("file") &&
                Array.from({ length: form.getValues("file").length }).map(
                  (_, idx) => {
                    return (
                      <li
                        key={idx}
                        className="p-2 px-4 bg-blue-100 rounded-xl flex justify-between items-center"
                      >
                        <span className="font-medium opacity-80">
                          {form.getValues("file")![idx].name}
                        </span>
                        <button className="p-1 bg-secondary rounded-full">
                          <XIcon size={20} />
                        </button>
                      </li>
                    );
                  }
                )}
            </ul>
            <div className="mt-5 grid grid-cols-5 gap-2">
              <Button type="submit" className="py-6 col-span-4">
                업로드
              </Button>
              <DialogClose asChild>
                <Button variant={"destructive"} className="py-6 col-span-1">
                  취소
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
