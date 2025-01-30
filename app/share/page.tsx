"use client";
import { Logo } from "@/components/logo";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { FileType } from "@/constants/type";
import { useToast } from "@/hooks/use-toast";
import { convertByte, getFileIcon } from "@/lib/utils";
import { MoveLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SharePage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState<FileType | null>(null);
  const [code, setCode] = useState("");

  const handleReset = () => {
    setCode("");
    setFile(null);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/files/download?code=${code}`);
      const contentDisposition = response.headers.get("Content-Disposition");

      let filename = "downloaded-file"; // 기본 파일명
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      toast({ title: "알수없는 오류가 발생했습니다." });
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const result = await fetch(`/api/files/share?code=${code}`);
      if (result.ok) {
        const data = await result.json();
        setFile(data.data.file);
      } else {
        const data = await result.json();
        setError(data.message);
        setCode("");
      }
    };

    try {
      if (code.length == 6) getData();
    } catch (e) {
      setCode("");
      setError("알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return (
    <main className="pb-10 h-full flex2 flex-col gap-5 bg-secondary">
      <Link href={"/"}>
        <Logo />
      </Link>
      <section className="p-5 w-80 sm:w-96 bg-background shadow-lg rounded-xl overflow-hidden">
        <div className={`h-96 w-[calc(200%)] duration-300 flex ${file && "-translate-x-[50%]"}`}>
          <div className="p-5 block h-full w-[50%]">
            <h2 className="w-full text-2xl font-semibold opacity-80">파일 다운로드</h2>
            <Image
              src={"/icons/attorney.svg"}
              alt="bear"
              height={128}
              width={128}
              className="mt-10 mx-auto"
            />

            <div className="mt-10 mx-auto w-fit">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(e) => {
                  setCode(e);
                  setError("");
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && (
              <p className="mt-5 text-sm text-center text-destructive font-medium">{error}</p>
            )}
          </div>
          <div className="p-5 flex h-full w-[50%] flex-col">
            {file && (
              <>
                <MoveLeftIcon
                  role="button"
                  onClick={handleReset}
                  size={36}
                  className="p-1 rounded-lg text-blue-400 hover:bg-secondary"
                />
                <Image
                  src={getFileIcon(file.FILE_EXTENSION)}
                  alt="folder"
                  height={72}
                  width={72}
                  className="mt-10 mx-auto"
                />
                <h2 className="mt-5 font-medium text-xl opacity-80 text-center">
                  {file.FILE_NAME}
                </h2>
                <div className="font-medium opacity-70 text-center">
                  {convertByte(file.FILE_SIZE)}
                </div>
              </>
            )}
          </div>
        </div>
        <Button
          disabled={isLoading || code.length != 6}
          onClick={handleDownload}
          className="w-full bg-blue-400 hover:bg-blue-300 duration-150 text-xl font-bold rounded-full text-background"
        >
          {isLoading ? <Spinner /> : <span>다운로드</span>}
        </Button>
      </section>
    </main>
  );
};

export default SharePage;
