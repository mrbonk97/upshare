import { auth } from "@/auth";
import { FileType } from "@/constants/type";
import { executeSql } from "@/lib/db";
import { NextResponse } from "next/server";

const SQL1 = `SELECT * FROM upshare_file WHERE file_id = :file_id`;

export const GET = auth(async function (req, { params }) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "[오류] 로그인이 필요한 서비스" }, { status: 401 });

  try {
    const { id: fileId } = await params!;
    const userId = req.auth.user.id;

    // 유효성 검사
    if (!fileId || Array.isArray(fileId)) {
      return NextResponse.json(
        { message: "[오류] 파일 ID가 제공되지 않았습니다." },
        { status: 400 }
      );
    }

    // 파일 데이터 조회
    const { rows } = await executeSql<FileType>(SQL1, [fileId]);

    if (!rows || rows.length !== 1) {
      return NextResponse.json({ message: "[오류] 파일이 존재하지 않습니다." }, { status: 404 });
    }

    const file = rows[0];

    if (file.USER_ID != userId) {
      return NextResponse.json({ message: "[오류] 다운로드 권한이 없습니다." }, { status: 403 });
    }

    // 데이터 반환
    return new NextResponse(file.FILE_DATA, {
      headers: {
        "Content-Disposition": `attachment; filename="${file.FILE_NAME}"`,
        "Content-Type": file.FILE_TYPE,
      },
    });
  } catch (error) {
    console.error("파일 조회 중 오류 발생:", error);
    return NextResponse.json({ message: "[오류] 서버 오류가 발생했습니다." }, { status: 500 });
  }
});
