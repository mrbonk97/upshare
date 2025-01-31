import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextResponse } from "next/server";

const SQL = "DELETE FROM FROM upshare_user WHERE id = :id";

export const DELETE = auth(async function GET(req) {
  try {
    if (!req.auth || !req.auth.user || !req.auth.user.id)
      throw new CustomError("로그인이 필요합니다.", 401);

    // 요청 데이터 파싱
    const userId = req.auth.user.id;
    // SQL 실행
    await executeSql(SQL, [userId], true);

    // 성공 응답
    return NextResponse.json({ code: "success" }, { status: 200 });
  } catch (error) {
    console.error("계절 탈퇴 중 오류 발생:", error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});
