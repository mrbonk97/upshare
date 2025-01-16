"use server";
import { auth } from "@/auth";
import { getDb } from "../db";
import oracledb from "oracledb";
import { CustomError } from "../error";

const SQL1 = `
INSERT INTO upshare_folder(user_id, folder_name) 
VALUES(:user_id, :folder_name)
RETURNING folder_id INTO :folder_id`;

const SQL2 = `
INSERT INTO upshare_folder_relation(folder_id, child_folder_id)
VALUES(:folder_id, :child_folder_id)`;

export const createFolderAction = async (curFolderId: string | undefined, folderName: string) => {
  const session = await auth();
  if (!session) throw new Error("오류: [폴더] 로그인이 필요한 서비스");
  const userId = session.user!.id;

  const conn = await getDb();

  try {
    const result1 = await conn.execute<{ folder_id: string }>(SQL1, {
      user_id: userId,
      folder_name: folderName,
      folder_id: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    });

    if (result1.rowsAffected != 1) throw new CustomError("폴더 생성 오류", 500, "원인 불명의 오류");
    const folderId = result1.outBinds!.folder_id[0];
    if (curFolderId != undefined) await conn.execute(SQL2, [curFolderId, folderId]);

    await conn.commit();
    console.log("[INFO] 폴더 생성 성공: ", folderId);
    return { message: "success" };
  } catch (error) {
    await conn.rollback();
    throw new CustomError("폴더 생성 오류", 500, "원인 불명의 오류");
  } finally {
    await conn.close();
  }
};
