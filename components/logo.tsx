import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const Logo = ({ width = 200, height = 200, className }: LogoProps) => {
  return (
    <Image
      src={"/images/logo.svg"}
      width={width}
      height={height}
      alt="logo"
      className={className}
    />
  );
};
