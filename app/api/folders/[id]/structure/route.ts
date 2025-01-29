import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextResponse } from "next/server";

const SQL = `
WITH A AS (SELECT folder_id, LEVEL AS depth 
           FROM upshare_folder_relation 
           START WITH child_folder_id = :folder_id 
           CONNECT BY PRIOR folder_id = child_folder_id  
) 
SELECT B.*, A.depth 
FROM A 
INNER JOIN (SELECT * FROM upshare_folder WHERE user_id = :user_id) B 
ON A.folder_id = B.folder_id 
UNION 
SELECT folder_id, user_id, folder_name, is_favorite, created_at, updated_at, 0 AS DEPTH 
FROM upshare_folder 
WHERE folder_Id = :folder_id 
AND user_id = :user_id 
ORDER BY depth DESC`;

export const GET = auth(async function GET(req, { params }) {
  try {
    if (!req.auth || !req.auth.user || !req.auth.user.id)
      throw new CustomError("로그인이 필요합니다.", 401);

    // 폴더 ID 및 사용자 ID 추출
    const { id: folderId } = await params!;
    const userId = req.auth.user.id;

    // 폴더 ID 유효성 검사
    if (!folderId) throw new CustomError("폴더 아이디가 없습니다.", 400);
    if (Array.isArray(folderId)) throw new CustomError("폴더 형식이 잘못되었습니다.", 400);

    // SQL 실행
    const result = await executeSql(SQL, [folderId, userId, folderId, userId]);

    // 성공 응답
    return NextResponse.json(
      {
        code: "success",
        data: {
          structure: result.rows,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("폴더 구조 조회 중 오류 발생:", error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});
