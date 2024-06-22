import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

export const Logo = ({ width = 200, height = 200 }: LogoProps) => {
  return (
    <Image
      src={"/images/logo-new.svg"}
      width={width}
      height={height}
      alt="logo"
    />
  );
};
