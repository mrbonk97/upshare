"use server";
import { auth } from "@/auth";
import { getDbPool } from "@/lib/db";

const query1 = `INSERT INTO upshare_folder(user_id, folder_name) 
                OUTPUT INSERTED.folder_id
                VALUES(@user_id, @folder_name)`;

const query2 = `INSERT INTO upshare_folder_relation(folder_id, child_folder_id)
                VALUES(@folder_id, @child_folder_id)`;

export const createFolderAction = async (
  curFolderId: string | undefined,
  folderName: string
) => {
  const session = await auth();
  if (!session) throw new Error("오류: [폴더] 로그인이 필요한 서비스");

  const pool = await getDbPool();
  const transaction = pool.transaction();

  try {
    await transaction.begin(); // 트랜잭션 시작

    const request = transaction.request();
    request.input("user_id", session.user?.id);
    request.input("folder_name", folderName);

    // query1 실행: 사용자 생성
    const result1 = await request.query(query1);
    if (result1.rowsAffected[0] !== 1) throw new Error("폴더 생성 실패");
    const child_folder_id = result1.recordset[0].folder_id;

    console.log(curFolderId);

    if (curFolderId != undefined) {
      // query2 실행: 기본 폴더 생성
      request.input("folder_id", curFolderId);
      request.input("child_folder_id", child_folder_id);
      const result2 = await request.query(query2);
      if (result2.rowsAffected[0] !== 1) throw new Error("폴더 매핑 실패");
    }

    await transaction.commit();
    console.log("폴더 생성 성공");

    return { status: "success" };
  } catch (error) {
    await transaction.rollback();
    console.error("폴더 생성 실패:", error);
    throw error;
  } finally {
    pool.close();
  }
};
