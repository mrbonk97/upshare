"use client";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { fileDownloadByCode } from "@/lib/action/file-action";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SharePage = () => {
  const _code = useSearchParams().get("code");
  const [code, setCode] = useState(_code == null ? "" : _code);
  const { mutate, isPending } = useMutation({
    mutationFn: () => fileDownloadByCode(code),
  });

  return (
    <main className="h-full w-full flex items-center pt-[15%] sm:pt-32 flex-col gap-5 sm:gap-10">
      <Link href={"/"}>
        <Logo />
      </Link>
      <Card className="max-w-80 sm:max-w-[450px]">
        <CardHeader>
          <CardTitle>파일 다운로드</CardTitle>
          <CardDescription>파일 공유 코드를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent className="pt-5 pb-10 flex justify-center">
          <InputOTP
            maxLength={8}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={code}
            onChange={setCode}
          >
            <InputOTPGroup>
              <InputOTPSlot className="w-7 h-7 sm:w-10 sm:h-10" index={0} />
              <InputOTPSlot className="w-7 h-7 sm:w-10 sm:h-10" index={1} />
              <InputOTPSlot className="w-7 h-7 sm:w-10 sm:h-10" index={2} />
              <InputOTPSlot className="w-7 h-7 sm:w-10 sm:h-10" index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot className="w-7 h-7 sm:w-10 sm:h-10" index={4} />
              <InputOTPSlot className="w-7 h-7 sm:w-10 sm:h-10" index={5} />
              <InputOTPSlot className="w-7 h-7 sm:w-10 sm:h-10" index={6} />
              <InputOTPSlot className="w-7 h-7 sm:w-10 sm:h-10" index={7} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={code.length != 8 || isPending}
            onClick={() => mutate()}
          >
            다운로드
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};
export default SharePage;
