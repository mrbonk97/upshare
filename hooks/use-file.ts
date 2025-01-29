import { Dispatch, SetStateAction, useState } from "react";
import { FileWithPath } from "react-dropzone";
import { useToast } from "./use-toast";

//prettier-ignore
export function useMyFile(): [FileWithPath[],Dispatch<SetStateAction<FileWithPath[]>>, (acceptedFile: FileWithPath[]) => void] {
  const { toast } = useToast();
  const [state, setState] = useState<FileWithPath[]>([]);

  // 용량 20MB가 넘는 파일이 있는지 확인
  const checkAndAppendFile = (acceptedFile: FileWithPath[]) => {
    const oversizedFile = acceptedFile.find((file) => file.size > 20_000_000);

    if (oversizedFile) {
      toast({
        title: "파일 용량 초과",
        description: `${oversizedFile.name} 파일이 20MB를 초과했습니다.`,
      });
      return;
    }

    setState((prev) => [...acceptedFile, ...prev]);
  };

  return [state, setState, checkAndAppendFile];
}
