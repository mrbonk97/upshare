"use client";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MemoryChart } from "@/components/memory-chart";

const PolicyPage = () => {
  return (
    <main className="h-full">
      <nav className="pt-20 pb-1 w-full bg-secondary">
        <ul className="px-5 pb-0 mx-auto max-w-screen-xl space-x-5 font-medium opacity-80">
          <li className="inline border-b-4 border-blue-400">
            <Link href={"/profile"}>기본정보</Link>
          </li>
          <li className="inline">
            <Link href={"/profile?menu=usage"}>사용량</Link>
          </li>
        </ul>
      </nav>
      <div className="p-10 mx-auto max-w-screen-xl">
        <section className="p-5 flex gap-10">
          <div className="h-52 w-52 rounded-full flex-shrink-0 bg-rose-200 relative">
            <button className="absolute bottom-0 right-0 rounded-full bg-secondary p-3">
              <PencilIcon size={20} />
            </button>
          </div>
          <ul className="flex flex-col justify-between">
            <li>이메일</li>
            <li>아이디</li>
            <li>가입 방식</li>
            <li>가입 날짜</li>
            <li>패스워드 변경</li>
          </ul>
        </section>

        <section className="mt-10 p-5 border-t">
          <h4 className="font-medium opacity-80">메모리 사용량</h4>
          <div className="flex gap-10">
            <MemoryChart />
            <ul className="font-medium opacity-80 space-y-5">
              <li>
                <span className="inline-block w-32">전체 파일 개수:</span>
                52개
              </li>
              <li>
                <span className="inline-block w-32">사용중인 메모리:</span>
                56MB
              </li>
              <li>
                <span className="inline-block w-32">할당받은 메모리:</span>
                100MB
              </li>
            </ul>
          </div>
        </section>
        <section className="mt-10 p-5 border-t">
          <h4 className="font-medium opacity-80">위험지역</h4>
          <div className="mt-5 flex">
            <div className="p-5 rounded-xl border flex items-center justify-center gap-10">
              <div className="font-medium opacity-80">
                <span className="text-lg">계정 탈퇴</span>
                <p className="text-sm">계정 탈퇴 후에는 복구가 불가능합니다.</p>
              </div>
              <Button variant={"destructive"}>계정 탈퇴</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PolicyPage;
