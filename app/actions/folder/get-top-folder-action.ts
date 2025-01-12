"use server";
import { auth } from "@/auth";
import { FolderType } from "@/constants/type";
import { getDbPool } from "@/lib/db";

const query = `SELECT * FROM upshare_folder f 
               WHERE NOT EXISTS ( 
                  SELECT 1 FROM upshare_folder_relation r 
                  WHERE f.folder_id = r.child_folder_id 
               ) AND f.user_id = 4`;

// 최상위 폴더 조회 query
export const getTopLevelFolderAction = async (): Promise<FolderType[]> => {
  const session = await auth();
  if (!session) throw new Error("오류: [폴더] 로그인이 필요한 서비스");

  const pool = await getDbPool();
  const request = pool.request();
  request.input("user_id", session.user!.id);
  const result = await request.query(query);
  return result.recordset;
};
