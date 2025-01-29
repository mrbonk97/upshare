import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { NextResponse } from "next/server";

const SQL1 = `UPDATE upshare_file SET file_name = :file_name WHERE file_id = :file_id AND user_id = :user_id`;
const SQL2 = `UPDATE upshare_file SET folder_id = :folder_id WHERE file_id = :file_id AND user_id = :user_id`;

export const PATCH = auth(async function (req, { params }) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "[오류] 로그인이 필요한 서비스" }, { status: 401 });

  // 요청 데이터 파싱
  const { name, id: folderId } = await req.json();
  const { id: fileId } = await params!;
  const userId = req.auth.user.id;

  if (!fileId)
    return NextResponse.json({ message: "[오류] 파일 id는 필수입니다." }, { status: 400 });
  if (!name && !folderId)
    return NextResponse.json({ message: "[오류] 이름이나 폴더id는 필수입니다." }, { status: 400 });

  try {
    let result = null;
    if (name) result = await executeSql(SQL1, [name, fileId, userId], true);
    if (folderId)
      result = await executeSql(SQL2, [folderId != -1 ? folderId : null, fileId, userId], true);

    if (result?.rowsAffected !== 1) {
      return NextResponse.json(
        { message: "[오류] 파일이 없거나 권한이 없습니다." },
        { status: 404 }
      );
    }

    // 성공 응답
    return NextResponse.json({ code: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { code: "error", message: "[오류] 서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});
