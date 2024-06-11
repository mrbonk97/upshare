"use client";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/auth-context";

export const SpaceIndicator = () => {
  const { user } = useAuth();

  if (user?.size == null || user.maxSize == null) {
    return;
  }
  const percentage = ((user!.size / user!.maxSize) * 100).toFixed(0);

  return (
    <div className="w-full p-5 flex flex-col">
      <span className="text-md font-semibold">메모리</span>
      <Progress
        value={parseInt(percentage)}
        className="h-1 mt-2 bg-primary-foreground"
      />
      <span className="mt-1 text-sm">
        {(user!.size / 1_024_000).toFixed(0)}mb /
        {(user!.maxSize / 1_024_000).toFixed(0)}mb 사용량 (
        {parseInt(percentage)}
        %)
      </span>
    </div>
  );
};
