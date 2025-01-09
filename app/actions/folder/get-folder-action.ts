"use server";
import { auth } from "@/auth";
import { getConnection } from "@/lib/db";

export const getFolderAction = async () => {
  const query = "SELECT * FROM upshare_folder WHERE user_id = @user_id";
  const session = await auth();
  if (!session) throw new Error("오류: [폴더] 로그인이 필요한 서비스");

  const pool = await getConnection();
  const request = pool.request();
  request.input("user_id", session.user!.id);
  const result = await request.query(query);

  return {
    message: "success",
    data: result.recordset,
  };
};

export const createFolderAction = async (formData: FormData) => {
  console.log(formData, "히히");
  const query =
    "INSERT INTO upshare_folder(parent_folder_id, folder_name, user_id) VALUES(@parent_folder_id, @folder_name, @user_id)";

  const session = await auth();
  if (!session) throw new Error("오류: [폴더] 로그인이 필요한 서비스");

  const pool = await getConnection();
  const request = pool.request();
  request.input("parent_folder_id", null);
  request.input("folder_name", formData.folderName);
  request.input("user_id", session.user!.id);
  const result = await request.query(query);

  return {
    message: "success",
    data: result.recordset,
  };
};
