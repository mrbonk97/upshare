import Image from "next/image";
import { Topnav2 } from "@/components/nav/top-nav2";
import { MemoryChart } from "@/components/memory-chart";
import { PencilIcon } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DeleteUserModal } from "./_components/delete-user-modal";
import { ChangePasswordModal } from "./_components/change-password-modal";
import { getMemoryUsage } from "@/lib/action";
import { convertByte } from "@/lib/utils";
import { Metadata } from "next";
import { Footer } from "@/components/nav/footer";

export const metadata: Metadata = {
  title: "프로필 -  UPSHARE",
};

const ProfilePage = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const memory = await getMemoryUsage(session);

  return (
    <>
      <Topnav2 />
      <main className="pt-14 lg:pt-16 min-h-full space-y-20 xl:space-y-5">
        {/* @ts-expect-error auth.js를 바꿀 User property는 readonly, 억지로 넣어줬음 */}
        <UserInfoSection name={session.user!.name!} createdAt={session.user!.createdAt!} />
        <MemorySection memoryUsage={memory.MEMORY_USAGE} fileCount={memory.FILE_COUNT} />
        <DangerSection />
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;

interface UserInfoProps {
  name: string;
  createdAt: string;
}

const UserInfoSection = ({ name, createdAt }: UserInfoProps) => (
  <section className="p-5 mx-auto max-w-[600px] xl:max-w-[1200px]">
    <h4 className="mb-5 w-full font-medium opacity-80">기본정보</h4>
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
      <div className="relative h-36 w-36">
        <Image
          src={"/user.png"}
          height={144}
          width={144}
          alt="user"
          className="border rounded-full"
        />
        <button className="absolute bottom-0 right-0 rounded-full bg-secondary p-3">
          <PencilIcon size={20} />
        </button>
      </div>
      <ul className="px-5 lg:border-l font-medium opacity-80">
        <li className="grid grid-cols-5 gap-2">
          <span className="col-span-2">아이디</span>
          <span className="col-span-3">: {name}</span>
        </li>
        <li className="grid grid-cols-5 gap-2">
          <span className="col-span-2">가입 방식</span>
          <span className="col-span-3">: 로컬</span>
        </li>
        <li className="grid grid-cols-5 gap-2">
          <span className="col-span-2 text-right">가입 날짜</span>
          <span className="col-span-3">: {createdAt.split("T")[0]}</span>
        </li>
        <li className="mt-5">
          <ChangePasswordModal />
        </li>
      </ul>
    </div>
  </section>
);

interface Props {
  memoryUsage: number;
  fileCount: number;
}
const MemorySection = ({ memoryUsage, fileCount }: Props) => (
  <section className="p-5 border-t mx-auto max-w-[600px] xl:max-w-[1200px]">
    <h4 className="mb-5 w-full font-medium opacity-80">메모리 사용량</h4>
    <div className="flex flex-col lg:flex-row items-center gap-10">
      <MemoryChart memoryUsage={memoryUsage} />
      <hgroup>
        <p className="text-2xl font-semibold opacity-80">{convertByte(memoryUsage)}/100mb 사용중</p>
        <p className="my-2 font-medium opacity-70">총 파일: {fileCount}개</p>
      </hgroup>
    </div>
  </section>
);

const DangerSection = () => (
  <section className="p-5 border-t mx-auto max-w-[600px] xl:max-w-[1200px]">
    <h4 className="mb-5 inline-flex font-medium opacity-80">위험지역</h4>
    <div className="p-5 w-fit rounded-xl border flex items-center justify-center gap-10">
      <div className="font-medium opacity-80">
        <span className="text-lg">계정 탈퇴</span>
        <p className="text-sm">계정 탈퇴 후에는 복구가 불가능합니다.</p>
      </div>
      <DeleteUserModal />
    </div>
  </section>
);
