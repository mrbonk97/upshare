"use client";
import { Input } from "@/components/ui/input";
import qs from "query-string";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedValue] = useDebounceValue(query, 100);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          q: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    if (url.length < 10) return;
    router.push(url);
  }, [debouncedValue]);

  return (
    <div className="relative w-2/3 md:w-[300px] lg:w-[450px]">
      <SearchIcon className="p-0 absolute top-1/2 transform -translate-y-1/2 ml-2" />
      <Input
        type="text"
        placeholder="파일 검색"
        className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
