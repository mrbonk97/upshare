import { Blocks, HeartIcon, HomeIcon } from "lucide-react";

export const PROFILE_MENU = [
  {
    title: "프로필 수정",
    url: "/profile",
  },
  {
    title: "FAQ",
    url: "/profile?mode=faq",
  },

  {
    title: "개인정보 처리방침",
    url: "/profile?mode=policy",
  },
];

export const MENU = [
  {
    title: "홈",
    link: "/home",
    icon: <HomeIcon size={14} className="text-rose-400" />,
  },
  {
    title: "즐겨찾기",
    link: "/folders/favorite",
    icon: <HeartIcon size={14} className="text-rose-400" />,
  },
  {
    title: "공유중",
    link: "/folders/share",
    icon: <Blocks size={14} className="text-rose-400" />,
  },
];
