import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Fetcher = (url: string) => fetch(url).then((res) => res.json());

export function convertByte(size: string | number) {
  if (typeof size == "string") size = parseInt(size);

  if (size >= 1_000_000_000) return `${(size / 1_000_000_000).toFixed(2)}GB`;
  if (size >= 1_000_000) return `${(size / 1_000_000).toFixed(2)}MB`;
  if (size >= 10_000) return `${(size / 10_000).toFixed(2)}KB`;
  return `${size}B`;
}

export function getFileIcon(type: string) {
  switch (type) {
    case "apk":
      return "/icons/002-apk.svg";
    case "css":
      return "/icons/003-css.svg";
    case "doc":
      return "/icons/005-doc.svg";
    case "xls":
      return "/icons/006-excel.svg";
    case "woff":
      return "/icons/007-font file.svg";
    case "iso":
      return "/icons/008-iso.svg";
    case "js":
      return "/icons/009-javascript.svg";
    case "png":
      return "/icons/010-image.svg";
    case "jpg":
      return "/icons/010-image.svg";
    case "jpeg":
      return "/icons/010-image.svg";
    case "mp3":
      return "/icons/013-mp3.svg";
    case "video":
      return "/icons/014-video.svg";
    case "pdf":
      return "/icons/014-pdf.svg";
    case "php":
      return "/icons/016-php.svg";
    case "ppt":
      return "/icons/018-powerpoint.svg";
    case "sql":
      return "/icons/022-sql.svg";
    case "svg":
      return "/icons/023-svg.svg";
    case "ttf":
      return "/icons/025-ttf.svg";
    case "txt":
      return "/icons/026-text.svg";
    case "zip":
      return "/icons/032-zip.svg";
    default:
      return "/icons/024-text.svg";
  }
}
