"use server";
import { auth } from "@/auth";
import { FolderType } from "@/constants/type";
import { getDbPool } from "@/lib/db";

const query = `SELECT A.* FROM upshare_folder A 
               INNER JOIN ( 
                  SELECT child_folder_id 
                  FROM upshare_folder_relation 
                  WHERE folder_id = @folder_id 
               ) B 
                ON A.folder_id = B.child_folder_id 
                WHERE A.user_id = @user_id`;

// 폴더 조회 query
export const getFolderByIdAction = async (
  parentFolderId: string
): Promise<FolderType[]> => {
  const session = await auth();
  if (!session) throw new Error("오류: [폴더] 로그인이 필요한 서비스");

  const pool = await getDbPool();
  const request = pool.request();
  request.input("user_id", session.user!.id);
  request.input("folder_id", parentFolderId);
  const result = await request.query(query);

  pool.close();
  return result.recordset;
};
