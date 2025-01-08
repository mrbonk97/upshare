import { BlendIcon, BlocksIcon, HeartIcon } from "lucide-react";

export const LEFT_MENU = [
  {
    title: "전체파일",
    url: "/all",
    icon: (
      <BlendIcon
        size={18}
        className="inline ml-5 mb-1"
        strokeOpacity={0}
        fill="#fb7185"
        // fill="#60a5fa"
      />
    ),
  },
  {
    title: "즐겨찾기",
    url: "/favorite",
    icon: (
      <HeartIcon
        size={18}
        className="inline ml-5 mb-1"
        strokeOpacity={0}
        fill="#fb7185"
      />
    ),
  },
  {
    title: "공유중",
    url: "/share",
    icon: (
      <BlocksIcon
        size={18}
        className="inline ml-5 mb-1"
        strokeOpacity={0}
        fill="#fb7185"
        // fill="#c084fc"
      />
    ),
  },
];
