"use client";
import formatBytes from "@/lib/format-byte";
import useStore from "@/store/store";

export const DataUsage = () => {
  const user = useStore.use.user();
  if (!user) return null;

  console.log(user);
  const percentage = ((user.memoryUsage / user.maxMemory) * 100).toFixed(2);

  const curMem = formatBytes(user.memoryUsage);

  return (
    <div className="text-sm">
      <div className="text-center">데이터 사용량 {percentage}%</div>
      <div className="mt-2 h-1 bg-blue-200 rounded-full">
        <div
          className="absolute h-1 bg-blue-500 duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-center text-xs">{curMem} / 50mb 사용중</div>
    </div>
  );
};
