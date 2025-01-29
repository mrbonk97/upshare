import Link from "next/link";

interface Props {
  title: string;
  url: string;
  icon: React.ReactNode;
}

export const LinkList = ({ title, url, icon }: Props) => (
  <li>
    <Link
      className="px-5 py-2 block rounded bg-background hover:opacity-80 duration-150"
      href={url}
    >
      {title}
      {icon}
    </Link>
  </li>
);
