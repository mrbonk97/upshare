import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <span
      className={cn(
        `inline-block h-7 aspect-square rounded-full border-4 border-background border-t-transparent animate-spin`,
        className
      )}
    />
  );
};
