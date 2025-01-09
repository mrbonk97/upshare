"use server";
import { auth } from "@/auth";
import { FolderType } from "@/constants/type";
import { getDbPool } from "@/lib/db";

export const getFolderAction = async (): Promise<FolderType[]> => {
  const query = "SELECT * FROM upshare_folder WHERE user_id = @user_id";
  const session = await auth();
  if (!session) throw new Error("오류: [폴더] 로그인이 필요한 서비스");

  const pool = await getDbPool();
  const request = pool.request();
  request.input("user_id", session.user!.id);
  const result = await request.query(query);

  return result.recordset;
};
