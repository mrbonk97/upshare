import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextResponse } from "next/server";

const SQL1 = `
SELECT file_id, folder_id, user_id, file_name, file_type, file_extension, file_size, is_share, share_code, created_at, updated_at 
FROM upshare_file 
WHERE user_id = :user_id 
AND file_name LIKE '%' || :q || '%'`;

const SQL2 = `
SELECT * FROM upshare_folder
WHERE user_id = :user_id 
AND folder_name LIKE '%' || :q || '%'`;

export const GET = auth(async function (req) {
  try {
    if (!req.auth || !req.auth.user || !req.auth.user.id)
      throw new CustomError("로그인이 필요합니다.", 401);

    // 요청 데이터 파싱
    const userId = req.auth.user.id;
    const q = req.nextUrl.searchParams.get("q") || "";

    console.log(q);

    // // SQL 실행
    const fileResult = await executeSql(SQL1, [userId, q]);
    const folderResult = await executeSql(SQL2, [userId, q]);

    // 성공 응답
    return NextResponse.json(
      {
        code: "success",
        data: {
          folders: folderResult.rows,
          files: fileResult.rows,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("파일 검색 중 오류 발생:", error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});
