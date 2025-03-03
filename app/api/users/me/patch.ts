import { auth } from "@/auth";
import { UpshareUserType } from "@/constants/type";
import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextResponse } from "next/server";

const SQL1 = "UPDATE upshare_user SET password_hash = :password_hash WHERE user_id = :user_id";
const SQL2 = "SELECT * FROM upshare_user WHERE user_id = :user_id";

export const PATCH = auth(async function GET(req) {
  try {
    if (!req.auth || !req.auth.user || !req.auth.user.id)
      throw new CustomError("로그인이 필요합니다.", 401);

    // 요청 데이터 파싱
    const userId = req.auth.user.id;
    const { originalPassword, password } = await req.json();
    if (originalPassword == password) throw new CustomError("패스워드가 동일합니다.", 400);
    if (typeof password != "string") throw new CustomError("패스워드가 문자열이 아닙니다.", 400);
    if (password.length < 4) throw new CustomError("패스워드가 너무 짧습니다.", 400);
    if (password.length > 30) throw new CustomError("패스워드가 너무 깁니다.", 400);

    const result = await executeSql<UpshareUserType>(SQL2, [userId]);
    if (result.rows?.length != 1) throw new CustomError("회원이 존재하지 않습니다.", 400);
    if (result.rows[0].PASSWORD_HASH != originalPassword)
      throw new CustomError("기존 패스워드가 일치하지 않습니다.", 400);

    // SQL 실행
    await executeSql(SQL1, [password, userId], true);

    // 성공 응답
    return NextResponse.json({ code: "success" }, { status: 200 });
  } catch (error) {
    console.error("패스워드 변경 중 오류 발생:", error);
    if (error instanceof CustomError) {
      return NextResponse.json({ code: "error", message: error.message }, { status: error.code });
    }
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});
