"use client";
import { DeleteAccountModal } from "@/components/modal/delet-account-modal";
import { TopNavbar } from "@/components/nav/top-nav";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserImage } from "@/components/user-image";
import { useRef, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { changeName } from "@/api/users-api";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const auth = useAuth();
  const [menu, setMenu] = useState("PROFILE");

  const handleSubmit = async () => {
    if (ref.current == null) return;
    if (ref.current.value == null) return;
    const isSuccess = await changeName(ref.current!.value);
    if (isSuccess) {
      toast({
        title: "이름을 수정했습니다.",
        description: `이름: ${ref.current.value}`,
      });
      console.log("응애");
    }
  };
  return (
    <>
      <TopNavbar />
      <main className="min-h-full w-full pt-14 flex bg-secondary">
        <section className="fixed h-full w-96 pt-20 px-5 bg-secondary">
          <div className="w-full flex justify-center">
            <UserImage className="w-32 h-32" />
          </div>
          <div className="space-y-5 mt-10">
            <Button className="w-full py-6" onClick={() => setMenu("PROFILE")}>
              프로필 수정
            </Button>
            <Button className="w-full py-6" onClick={() => setMenu("FAQ")}>
              FAQ
            </Button>
            <Button className="w-full py-6" onClick={() => setMenu("POLICY")}>
              개인정보 처리방침
            </Button>
            <DeleteAccountModal />
          </div>
        </section>

        {menu == "PROFILE" && (
          <section className="p-5 ml-96 w-full bg-primary-foreground flex2">
            <Card>
              <CardHeader>
                <CardTitle>프로필 수정</CardTitle>
                <CardDescription>
                  이곳에서 이름을 변경하실 수 있습니다. 수정 후 저장 버튼을
                  눌러주세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      이름
                    </Label>
                    <Input
                      id="name"
                      defaultValue={auth.user?.name}
                      className="col-span-3"
                      ref={ref}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubmit}>
                  저장
                </Button>
              </CardFooter>
            </Card>
          </section>
        )}

        {menu == "FAQ" && (
          <section className="p-10 ml-96 w-full bg-primary-foreground">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>평생 무료인가요?</AccordionTrigger>
                <AccordionContent>네. 무료입니다.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger> 회원 탈퇴는 어떻게 하나요?</AccordionTrigger>
                <AccordionContent>
                  로그인 후, 프로필 페이지에서 "회원 탈퇴"를 선택하시면 계정을
                  삭제할 수 있습니다. 탈퇴 시 모든 데이터가 영구 삭제되므로
                  신중하게 결정해 주세요.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  파일을 어떻게 업로드 하나요?
                </AccordionTrigger>
                <AccordionContent>
                  "파일 업로드" 버튼을 클릭하여 업로드할 파일을 선택하면 파일이
                  서버에 업로드됩니다. 업로드된 파일은 "홈 화면"에서 확인할 수
                  있습니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  파일의 최대 업로드 용량은 얼마인가요?
                </AccordionTrigger>
                <AccordionContent>
                  파일 당 최대 5MB까지 업로드할 수 있습니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  파일 다운로드 링크를 공유하고 싶어요.
                </AccordionTrigger>
                <AccordionContent>
                  "내 파일" 페이지에서 공유하고자 하는 파일 옆의 "공유" 버튼을
                  클릭하면 다운로드 링크를 생성할 수 있습니다. 생성된 링크를
                  복사하여 다른 사람과 공유할 수 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        )}
        {menu == "POLICY" && (
          <section className="p-10 ml-96 w-full bg-primary-foreground">
            <article className="pl-5 max-w-[800px] space-y-5">
              <h1 className="text-xl font-semibold">
                파일 공유 서비스 개인정보 처리방침
              </h1>
              <p className="mt-2">
                파일 공유 서비스('이하 '서비스')는 개인정보 보호법에 따라
                이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고
                원활하게 처리할 수 있도록 하기 위하여 다음과 같은 개인정보
                처리방침을 수립·공개합니다.
              </p>

              <hgroup>
                <h2>1. 개인정보의 처리 목적</h2>

                <p className="mt-2">
                  서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리한
                  개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용
                  목적이 변경될 시에는 사전 동의를 구할 것입니다.
                </p>
                <ul className="mt-1 pl-10 list-disc">
                  <li>회원 가입 및 관리</li>
                  <li>파일 업로드, 다운로드 및 공유 기능 제공</li>
                  <li>서비스 제공 및 맞춤형 서비스 제공</li>
                  <li>서비스 이용 관련 통계 분석 및 서비스 개선</li>
                  <li>고충 처리 및 분쟁 해결</li>
                </ul>
              </hgroup>

              <hgroup>
                <h2>2. 개인정보의 처리 및 보유 기간</h2>
                <p className="mt-2">
                  [서비스]는 법령에 따른 개인정보 보유·이용기간 또는
                  정보주체로부터 개인정보를 수집 시 동의받은 개인정보
                  보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <ul className="mt-1 pl-10 list-disc">
                  <li>회원가입 정보: 회원 탈퇴 시까지</li>
                  <li>서비스 이용 기록: 1년</li>
                  <li>불만 또는 분쟁 처리에 필요한 기록: 3년</li>
                </ul>
              </hgroup>

              <hgroup>
                <h2>3. 처리하는 개인정보의 항목</h2>
                <p className="mt-2">
                  [서비스]는 다음의 개인정보 항목을 처리하고 있습니다.
                </p>
                <ul className="mt-1 pl-10 list-disc">
                  <li>회원 가입 시: 이름, 이메일 주소, 비밀번호</li>
                  <li>
                    파일 공유 시: 파일명, 파일 내 포함된 개인정보(필요 시)
                  </li>
                  <li>
                    서비스 이용 기록: IP 주소, 쿠키, 방문 기록, 이용 콘텐츠 기록
                  </li>
                </ul>
              </hgroup>

              <hgroup>
                <h2>4. 개인정보의 제3자 제공</h2>
                <p className="mt-2">
                  [서비스]는 이용자의 개인정보를 원칙적으로 외부에 제공하지
                  않습니다. 다만, 다음의 경우에는 예외로 합니다.
                </p>
                <ul className="mt-1 pl-10 list-disc">
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>
                    법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
                    방법에 따라 수사기관의 요구가 있는 경우
                  </li>
                </ul>
              </hgroup>

              <hgroup>
                <h2>6. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h2>

                <p className="mt-2">
                  이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수
                  있습니다.
                </p>
                <ul className="mt-1 pl-10 list-disc">
                  <li>개인정보 열람 요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제 요구</li>
                  <li>처리 정지 요구</li>
                </ul>
                <p className="mt-1">
                  권리 행사는 서면, 전화, 이메일 등을 통해 하실 수 있으며,
                  [서비스]는 이에 대해 지체 없이 조치하겠습니다.
                </p>
              </hgroup>

              <hgroup>
                <h2>7. 개인정보의 파기</h2>

                <p className="mt-2">
                  [서비스]는 원칙적으로 개인정보 처리 목적이 달성된 경우에는
                  지체 없이 해당 개인정보를 파기합니다. 파기의 절차 및 방법은
                  다음과 같습니다.
                </p>
                <ul className="mt-1 pl-10 list-disc">
                  <li>
                    파기 절차: 이용자가 입력한 정보는 목적 달성 후 내부 방침 및
                    기타 관련 법령에 따라 일정 기간 저장된 후 혹은 즉시
                    파기됩니다.
                  </li>
                  <li>
                    파기 방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는
                    기술적 방법을 사용합니다.
                  </li>
                </ul>
              </hgroup>

              <hgroup>
                <h2>8. 개인정보의 안전성 확보 조치</h2>
                <p className="mt-2">
                  [서비스]는 개인정보의 안전성 확보를 위해 다음과 같은 조치를
                  하고 있습니다.
                </p>
                <ul className="mt-1 pl-10 list-disc">
                  <li>
                    관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
                  </li>
                  <li>
                    기술적 조치: 개인정보처리시스템 등의 접근권한 관리,
                    접근통제시스템 설치, 고유 식별정보 등의 암호화
                  </li>
                  <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
                </ul>
              </hgroup>

              <hgroup>
                <h2>9. 개인정보 보호책임자</h2>
                <p className="mt-2">
                  [서비스]는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                  개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                  위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <ul className="mt-1 pl-10 list-disc">
                  <li>개인정보 보호책임자: 김현석</li>
                  <li>연락처: 010-8433-3792, hyunsuk1997@naver.com</li>
                </ul>
              </hgroup>

              <hgroup>
                <h2>10. 개인정보 처리방침 변경</h2>
                <p className="mt-2">
                  이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에
                  따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의
                  시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                </p>
                <ul className="mt-1 pl-10 list-disc pb-10">
                  <li>공고일자: 2024-06-07</li>
                  <li>시행일자: 2024-06-07</li>
                </ul>
              </hgroup>
            </article>
          </section>
        )}
      </main>
    </>
  );
};

export default ProfilePage;
