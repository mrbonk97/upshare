import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Faq = () => {
  return (
    <article className="p-5">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>평생 무료인가요?</AccordionTrigger>
          <AccordionContent>네. 무료입니다.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>회원 탈퇴는 어떻게 하나요?</AccordionTrigger>
          <AccordionContent>
            로그인 후, 프로필 페이지에서 &ldquo;회원 탈퇴&rdquo;를 선택하시면
            계정을 삭제할 수 있습니다. 탈퇴 시 모든 데이터가 영구 삭제되므로
            신중하게 결정해 주세요.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>파일을 어떻게 업로드 하나요?</AccordionTrigger>
          <AccordionContent>
            &ldquo;파일 업로드&rdquo; 버튼을 클릭하여 업로드할 파일을 선택하면
            파일이 서버에 업로드됩니다. 업로드된 파일은 &ldquo;홈
            화면&rdquo;에서 확인할 수 있습니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            파일의 최대 업로드 용량은 얼마인가요?
          </AccordionTrigger>
          <AccordionContent>
            파일 당 최대 10MB까지 업로드할 수 있습니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            파일 다운로드 링크를 공유하고 싶어요.
          </AccordionTrigger>
          <AccordionContent>
            &ldquo;내 파일&rdquo; 페이지에서 공유하고자 하는 파일 옆의
            &ldquo;공유&rdquo; 버튼을 클릭하면 다운로드 링크를 생성할 수
            있습니다. 생성된 링크를 복사하여 다른 사람과 공유할 수 있습니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  );
};
