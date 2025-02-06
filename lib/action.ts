"use server";
import { signIn, signOut } from "@/auth";
import { executeSql } from "./db";
import { Session } from "next-auth";
import { CustomError } from "./error";

export async function handleSignIn(formData: FormData) {
  return await signIn("credentials", formData);
}

export async function handleSignOut(url: string) {
  return await signOut({ redirectTo: url });
}

const SQL = `
SELECT      SUM(file_size) as memory_usage
       ,    COUNT(*) as file_count from upshare_file
WHERE user_id = :user_id`;

type MemoryType = {
  MEMORY_USAGE: number;
  FILE_COUNT: number;
};

export const getMemoryUsage = async (session: Session) => {
  const userId = session.user?.id;
  if (typeof userId != "string") throw new CustomError("유저 아이디가 없음", 400);
  const result = await executeSql<MemoryType>(SQL, [userId]);
  if (!result.rows) throw new CustomError("알수없는 오류", 500);
  if (result.rows.length == 0) throw new CustomError("해당하는 유저가 없음", 400);
  if (result.rows.length > 1) throw new CustomError("해당하는 유저가 너무 많음", 400);
  return result.rows[0];
};
