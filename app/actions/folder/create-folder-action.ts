"use server";
import sql from "mssql";
import { auth } from "@/auth";
import { getDbPool } from "@/lib/db";

const query =
  "INSERT INTO upshare_folder(parent_folder_id, folder_name, user_id) VALUES(@parent_folder_id, @folder_name, @user_id)";

export const createFolderAction = async (
  parentFolderId: string | null,
  folderName: string
) => {
  parentFolderId = null;
  const pool = await getDbPool();
  const session = await auth();

  if (!session) throw new Error("오류: [폴더] 로그인이 필요한 서비스");

  const ps = new sql.PreparedStatement(pool);

  ps.input("parent_folder_id", sql.Int);
  ps.input("folder_name", sql.VarChar);
  ps.input("user_id", sql.Int);
  await ps.prepare(query);

  const result = await ps.execute({
    parent_folder_id: parentFolderId,
    folder_name: folderName,
    user_id: session.user?.id,
  });

  return {
    status: "success",
    data: result.recordset,
  };
};
