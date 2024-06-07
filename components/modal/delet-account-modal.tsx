"use client";
import { deleteAccount } from "@/api/users-api";
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
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function DeleteAccountModal() {
  const router = useRouter();

  const handleAccountDelete = async () => {
    const isSuccess = await deleteAccount();
    if (isSuccess) router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="w-full py-6">
          회원탈퇴
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
          <Button onClick={handleAccountDelete} variant={"destructive"}>
            탈퇴
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
