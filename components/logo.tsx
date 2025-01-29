import Image from "next/image";

interface Props {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 80, className }: Props) => (
  <Image
    src={"/file-share.svg"}
    height={size}
    width={size}
    alt="upshare"
    className={`h-20 w-20 ${className}`}
  />
);
