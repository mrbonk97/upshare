"use client";
import { Spinner } from "@/components/spinner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { handleSignOut } from "@/lib/action";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useState } from "react";

export const DeleteUserModal = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await fetch("/api/users/me", { method: "DELETE" });
      await handleSignOut("/");
    } catch (e) {
      // 악마같은 auth.js 너무 이상하다.
      if (isRedirectError(e)) throw e;
      toast({ title: "회원 탈퇴중 오류가 발생했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>계정 탈퇴</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>서비스 탈퇴</AlertDialogTitle>
          <AlertDialogDescription>
            삭제는 즉시 서버에 반영되며, 복구가 불가능합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} className="w-full">
            취소
          </AlertDialogCancel>
          <Button disabled={isLoading} onClick={handleDelete} variant={"destructive"}>
            {isLoading ? <Spinner /> : <span>계정 탈퇴</span>}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
