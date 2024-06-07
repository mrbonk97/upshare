"use client";
import { fileDownloadCode } from "@/api/file-api";
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
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SharePage = () => {
  const searchParams = useSearchParams();
  const codeParams = searchParams.get("code");
  const [code, setCode] = useState(codeParams == null ? "" : codeParams);

  const handleDownload = () => {
    fileDownloadCode(code);
  };

  return (
    <main className="h-full w-full flex2">
      <Card>
        <CardHeader>
          <CardTitle>파일 다운로드</CardTitle>
          <CardDescription>파일 공유 코드를 입력해주세요</CardDescription>
        </CardHeader>
        <CardContent className="pt-5 pb-10">
          <InputOTP
            maxLength={8}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={code}
            onChange={(_code) => setCode(_code)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={code.length != 8}
            onClick={handleDownload}
          >
            다운로드
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};
export default SharePage;
