import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextResponse } from "next/server";
import OracleDB from "oracledb";

const SQL1 = `
INSERT INTO upshare_folder(user_id, folder_name) 
VALUES(:user_id, :folder_name)
RETURNING folder_id INTO :folder_id`;

const SQL2 = `
INSERT INTO upshare_folder_relation(folder_id, child_folder_id)
VALUES(:folder_id, :child_folder_id)`;

export const POST = auth(async function GET(req) {
  const conn = await getDb();
  try {
    if (!req.auth || !req.auth.user || !req.auth.user.id)
      throw new CustomError("로그인이 필요합니다.", 401);

    // 사용자 Id, 폴더 명 상위 폴더 Id 추출
    const userId = req.auth.user.id;
    const { folderName, curFolderId } = await req.json();

    // 폴더 ID 유효성 검사
    if (typeof folderName != "string") throw new CustomError("폴더 이름이 없습니다.", 400);

    // SQL 실행

    const result1 = await conn.execute<{ folder_id: string }>(SQL1, {
      user_id: userId,
      folder_name: folderName,
      folder_id: { type: OracleDB.NUMBER, dir: OracleDB.BIND_OUT },
    });

    if (result1.rowsAffected != 1) throw new CustomError("폴더 생성중 오류", 500);
    const folderId = result1.outBinds!.folder_id[0];
    if (curFolderId != undefined) await conn.execute(SQL2, [curFolderId, folderId]);
    await conn.commit();
    await conn.close();

    // 성공 응답
    return NextResponse.json({ code: "success" }, { status: 200 });
  } catch (error) {
    await conn.close();
    console.error("폴더 생성 중 오류 발생:", error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});
