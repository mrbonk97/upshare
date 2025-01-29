import { BlendIcon, BlocksIcon, HeartIcon } from "lucide-react";

export const LEFT_MENU = [
  {
    title: "전체파일",
    url: "/folders/all",
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
    title: "공유중",
    url: "/folders/share",
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
