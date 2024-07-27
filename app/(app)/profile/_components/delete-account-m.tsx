"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAccount } from "@/lib/api/user-api";
import { useMutation } from "@tanstack/react-query";

export const DeleteAccountM = () => {
  const { mutate, isSuccess, isPending, isError } = useMutation({
    mutationFn: deleteAccount,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"destructive"}
          className="w-full py-6 cursor-pointer"
          asChild
        >
          <li>회원탈퇴</li>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>정말로 탈퇴하시겠습니까?</DialogTitle>
          <DialogDescription className="py-5">
            회원 탈퇴 이후 모든 데이터는 즉시 삭제되며, <br />
            복구하실 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => mutate()} variant={"destructive"}>
            탈퇴
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
