import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { NextResponse } from "next/server";

const SQL = `
UPDATE upshare_folder
SET folder_name = :folder_name
WHERE folder_id = :folder_id
AND user_id = :user_id`;

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json(
      { message: "[오류] 로그인이 필요한 서비스" },
      { status: 401 }
    );

  const folderId = (await params)!.id;
  const userId = req.auth.user.id;

  const result = await executeSql(SQL, [folderId, userId]);

  return NextResponse.json(
    {
      message: "success",
    },
    { status: 200 }
  );
});
