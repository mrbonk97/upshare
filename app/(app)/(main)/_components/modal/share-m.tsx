"use client";
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
import { toast } from "@/components/ui/use-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import { shareFile } from "@/lib/api/folder-api";
import { useState } from "react";
import { stopShareFile } from "@/lib/action/file-action";

interface ShareMProps {
  id: string;
  code: string | null;
}

export const ShareM = ({ id, code }: ShareMProps) => {
  const queryClient = useQueryClient();
  const [shareCode, setShareCode] = useState(code);

  const share = useMutation({
    mutationFn: () => shareFile(id),
    onSuccess: (data) => {
      setShareCode(data.data.result.code);
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
    },
  });

  const stopShare = useMutation({
    mutationFn: () => stopShareFile(id),
    onSuccess: (data) => {
      setShareCode(null);
    },
  });

  const handleCopy = () => {
    toast({
      title: "클립보드에 복사하였습니다.",
      description: `파일 코드: ${shareCode}`,
    });

    const baseUrl = window.location.href.split("/");
    navigator.clipboard.writeText(
      `${baseUrl[0]}//${baseUrl[2]}/share?code=${shareCode}`
    );
  };

  return (
    <AlertDialog
      onOpenChange={(e) => {
        // 닫았고 공유중에서 공유 중지로 바꾼 경우
        if (!e && !shareCode && code)
          queryClient.invalidateQueries({
            queryKey: ["folders"],
          });
      }}
    >
      <AlertDialogTrigger className="h-full w-full py-1 text-center hover:bg-secondary">
        {code ? "공유보기" : "공유하기"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>공유하기</AlertDialogTitle>
          <AlertDialogDescription>
            {!shareCode &&
              !share.isPending &&
              !stopShare.isPending &&
              "파일을 공유하고 있지 않습니다."}
            {share.isPending && "공유 준비중..."}
            {stopShare.isPending && "공유를 중지하고 있습니다..."}
            {share.isSuccess && "파일을 공유중 입니다."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {shareCode ? (
          <div className="h-32 flex2">
            <span className="text-2xl px-5">코드: {shareCode}</span>
            <Button
              onClick={handleCopy}
              variant={"ghost"}
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Copy />
            </Button>
          </div>
        ) : (
          <div className="h-32 flex2">
            <Button
              className="h-24 w-24 rounded-full"
              onClick={() => share.mutate()}
            >
              공유하기
            </Button>
          </div>
        )}
        <AlertDialogFooter>
          {shareCode && (
            <Button
              onClick={() => {
                share.reset();
                stopShare.mutate();
              }}
            >
              공유 중지
            </Button>
          )}
          <AlertDialogCancel>닫기</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
