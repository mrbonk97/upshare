import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <span
      className={cn(
        `inline-block h-8 aspect-square rounded-full border-4 border-t-transparent border-background animate-spin`,
        className
      )}
    />
  );
};
