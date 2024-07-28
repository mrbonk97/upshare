import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(a: number, b = 2) {
  if (!+a) return "0b";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))}${
    ["b", "kb", "mb", "gb", "tb", "pb", "eb", "zb", "yb"][d]
  }`;
}
