import { cn } from "@/lib/utils";
import { PulseLoader } from "react-spinners";

export const Spinner2 = ({
  loading,
  clasName,
}: {
  loading: boolean;
  clasName?: string;
}) => {
  return (
    <PulseLoader
      color="#8b5cf6"
      className={cn(clasName)}
      loading={loading}
      size={32}
    />
  );
};
