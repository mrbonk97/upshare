//공유중인 파일을 다운로드드 하는 API

import { FileType } from "@/constants/type";
import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

const SQL = "SELECT * FROM upshare_file where is_share = 1 AND share_code = :share_code";

export const GET = async (req: NextRequest) => {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (code == null) throw new CustomError("코드가 필요합니다.", 400);
    if (code.length != 6) throw new CustomError("코드의 길이가 6이 아닙니다.", 400);

    const fileData = await executeSql<FileType>(SQL, [code]);

    if (fileData.rows == undefined) throw new CustomError("서버에서 오류가 발생했습니다.", 500);
    if (fileData.rows.length == 0) throw new CustomError("코드와 일치하는 파일이 없습니다.", 400);
    if (fileData.rows.length > 1)
      throw new CustomError("코드와 일치하는 파일이 너무 많습니다.", 400);

    const file = fileData.rows[0];

    return new NextResponse(file.FILE_DATA, {
      headers: {
        "Content-Disposition": `attachment; filename="${file.FILE_NAME}"`,
        "Content-Type": file.FILE_TYPE,
      },
    });
  } catch (error) {
    console.error("공유 파일 코드 조회 중 오류 발생:", error);

    if (error instanceof CustomError) {
      return NextResponse.json({ code: "error", message: error.message }, { status: error.code });
    }
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
};
