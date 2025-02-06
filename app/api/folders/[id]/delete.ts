import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextResponse } from "next/server";

const SQL = `
DECLARE
  v_folder_id NUMBER := :p_folder_id;
  v_user_id NUMBER := :p_user_id;
BEGIN
  DELETE_UPSHARE_FOLDER(v_folder_id, v_user_id);
END;`;

export const DELETE = auth(async function (req, { params }) {
  try {
    if (!req.auth || !req.auth.user || !req.auth.user.id)
      throw new CustomError("로그인이 필요합니다.", 401);

    // 요청 데이터 파싱
    const { id: folderId } = await params!;
    const userId = req.auth.user.id;

    // 유효성 검사
    if (!folderId) throw new CustomError("폴더 id가 필요합니다.", 400);
    if (Array.isArray(folderId)) throw new CustomError("폴더 형식이 잘못되었습니다.", 400);

    // SQL 실행
    await executeSql(SQL, { p_folder_id: folderId, p_user_id: userId });

    // 성공 응답
    return NextResponse.json({ code: "success" }, { status: 200 });
  } catch (error) {
    console.error("폴더 삭제 중 오류 발생:", error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});
