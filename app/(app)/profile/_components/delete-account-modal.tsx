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
import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";

export function DeleteAccountModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOut = useStore.use.signOut();

  const handleAccountDelete = async () => {
    const result = await api.delete("/users/me");
    if (result.status === 200) {
      queryClient.clear();
      signOut();
      localStorage.removeItem("access_token");
      router.push("/bye");
    }
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
