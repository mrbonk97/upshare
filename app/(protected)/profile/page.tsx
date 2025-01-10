import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MemoryChart } from "@/components/memory-chart";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <main className="min-h-full">
      <div className="pt-32 p-5 mx-auto max-w-screen-xl">
        <section className="p-5 flex flex-col items-center lg:items-start lg:flex-row gap-10">
          <div className="relative h-52 w-52">
            <Image
              src={"/user.png"}
              height={208}
              width={208}
              alt="user"
              className="border rounded-full"
            />
            <button className="absolute bottom-0 right-0 rounded-full bg-secondary p-3">
              <PencilIcon size={20} />
            </button>
          </div>
          <ul className="pt-5 lg:pt-0 border-t lg:border-none w-full lg:w-auto flex flex-col justify-between font-medium opacity-80">
            <li className="grid grid-cols-5 gap-2">
              <span className="col-span-2 text-right">이메일</span>
              <span className="col-span-3">-</span>
            </li>
            <li className="grid grid-cols-5 gap-2">
              <span className="col-span-2 text-right">아이디</span>
              <span className="col-span-3">hyunsuk97</span>
            </li>
            <li className="grid grid-cols-5 gap-2">
              <span className="col-span-2 text-right">가입 방식</span>
              <span className="col-span-3">로컬</span>
            </li>
            <li className="grid grid-cols-5 gap-2">
              <span className="col-span-2 text-right">가입 날짜</span>
              <span className="col-span-3">2025-01-10</span>
            </li>
          </ul>
        </section>

        <section className="mt-10 p-5 border-t">
          <h4 className="font-medium opacity-80">메모리 사용량</h4>
          <div className="flex flex-col lg:flex-row gap-10">
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

export default ProfilePage;
