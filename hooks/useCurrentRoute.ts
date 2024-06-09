import { usePathname, useSearchParams } from "next/navigation";

export function useCurrentRoute() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const pathname = usePathname().split("/");
  const route = pathname[1];
  const folderId = pathname[2];

  if (route == "folders") {
    return { path: "folder", folderId: folderId, query: null };
  }

  if (route == "home") {
    return { path: "home", folderId: null, query: null };
  }

  if (route == "search") {
    return { path: "search", folderId: null, query: search };
  }

  return { path: null, folderId: null, query: null };
}
