import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

const SQL = `
INSERT INTO upshare_file(folder_id, user_id, file_name, file_type, file_extension, file_size, file_data)
VALUES(:folder_id, :user_id, :file_name, :file_type, :file_extension, :file_size, :file_data)`;

export const POST = auth(async function (req) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "[오류] 로그인이 필요한 서비스" }, { status: 401 });

  const userId = req.auth.user.id;
  const formData = await req.formData();

  // 폴더 ID와 파일 목록 추출
  const folderId = formData.get("folder_id");
  const files = formData.getAll("files");

  // 유효성 검사: 파일이 존재하는지 확인
  if (files.length === 0) {
    return NextResponse.json({ message: "[오류] 파일을 제공해야 합니다." }, { status: 400 });
  }

  const conn = await getDb();

  try {
    for (const file of files) {
      // 파일 유효성 검사
      if (!(file instanceof File)) {
        throw new Error("파일 형식이 잘못됨");
      }

      // 파일 데이터를 Buffer로 변환
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // SQL 실행
      await conn.execute(SQL, {
        folder_id: folderId,
        user_id: userId,
        file_name: file.name,
        file_type: file.type,
        file_extension: file.name.split(".").pop(),
        file_size: file.size,
        file_data: buffer,
      });
    }

    // 커밋
    await conn.commit();

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (e) {
    // 오류 발생 시 롤백
    await conn.rollback();
    console.error("[오류] 파일 저장 중 오류 발생", e);
    return NextResponse.json({ message: "파일 업로드 중 오류가 발생했습니다." }, { status: 500 });
  } finally {
    // DB 연결 종료
    await conn.close();
  }
});
