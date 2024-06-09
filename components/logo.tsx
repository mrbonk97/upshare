import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/home"}>
      <Image
        src={"/images/block-favicon-black.png"}
        width={50}
        height={50}
        alt="logo"
      />
    </Link>
  );
};
