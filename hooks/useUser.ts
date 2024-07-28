import { getUserInfo } from "@/lib/api/folder-api";
import useStore from "@/store/store";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const signIn = useStore.use.signIn();

  const { isPending, isSuccess, isError, data } = useQuery({
    queryKey: ["sign-in"],
    queryFn: getUserInfo,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  if (isSuccess) signIn(data.data.result);

  return [isPending, isSuccess, isError];
}
