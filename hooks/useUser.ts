import { signInUser } from "@/lib/action/user-action";
import useStore from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useUser() {
  const signIn = useStore.use.signIn();
  const isLoggedIn = useStore.use.isLoaded();

  const { isPending, isError, data } = useQuery({
    queryKey: ["sign-in"],
    queryFn: () => {
      if (isLoggedIn) return true;
      return signInUser();
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    if (isPending) return;
    if (isError) return;
    signIn(data);
  }, [isPending]);

  return [isPending, isError];
}
