"use client";
import useStore from "@/store/store";
export const DataUsage = () => {
  const user = useStore.use.user();
  if (user == null) return;

  const percentage = ((user.size / user.maxSize) * 100).toFixed(2);
  const curMem =
    user.size > 1048576
      ? (user.size / 1048576).toFixed(2) + "mb"
      : (user.size / 1048).toFixed(2) + "kb";

  return (
    <div className="">
      <div className="text-center">데이터 사용량 {percentage}%</div>
      <div className="mt-2 h-1 bg-blue-200 rounded-full">
        <div
          className="absolute h-1 bg-blue-500 duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-center text-sm">{curMem} / 50mb 사용중</div>
    </div>
  );
};
