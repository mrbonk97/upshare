import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { NextResponse } from "next/server";

const SQL = `
UPDATE upshare_file 
SET is_share =  CASE 
                WHEN is_share = 1 THEN 0 
                WHEN is_share = 0 THEN 1 
                END, 
share_code = (SELECT DBMS_RANDOM.STRING('x', 6) AS random_string FROM dual) 
WHERE file_id = :file_id AND user_id = :user_id`;

export const GET = auth(async function (req, { params }) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "[오류] 로그인이 필요한 서비스" }, { status: 401 });

  try {
    // 요청 데이터 파싱
    const { id: fileId } = await params!;
    const userId = req.auth.user.id;

    // 유효성 검사
    if (!fileId || Array.isArray(fileId)) {
      return NextResponse.json(
        { message: "[오류] 파일 ID가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    if (!userId)
      return NextResponse.json(
        { message: "[오류] 사용자 ID가 제공되지 않았습니다." },
        { status: 400 }
      );

    // SQL 실행
    const result = await executeSql(SQL, [fileId, userId], true);

    // 삭제 결과 확인
    if (result.rowsAffected !== 1) {
      return NextResponse.json(
        { message: "[오류] 파일이 없거나 권한이 없습니다." },
        { status: 404 }
      );
    }

    // 성공 응답
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("파일 삭제 중 오류 발생:", error);
    return NextResponse.json({ message: "[오류] 서버 오류가 발생했습니다." }, { status: 500 });
  }
});
