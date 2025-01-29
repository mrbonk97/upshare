import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextResponse } from "next/server";

const SQL1 = `
SELECT A.* FROM upshare_folder A 
INNER JOIN (  SELECT child_folder_id 
              FROM upshare_folder_relation 
              WHERE folder_id = :folder_id ) B 
ON A.folder_id = B.child_folder_id 
WHERE A.user_id = :user_id`;

const SQL2 = `
SELECT file_id, folder_id, user_id, file_name, file_extension, file_size, is_share, is_favorite, created_at, updated_at 
FROM upshare_file 
WHERE folder_id = :folder_id 
AND user_id = :user_id`;

export const GET = auth(async function (req, { params }) {
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
    const folderResult = await executeSql(SQL1, [folderId, userId]);
    const fileResult = await executeSql(SQL2, [folderId, userId]);

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
    console.error("폴더 및 파일 조회 중 오류 발생:", error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});
