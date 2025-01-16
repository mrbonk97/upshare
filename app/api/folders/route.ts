import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { NextResponse } from "next/server";

const SQL1 = `
SELECT * FROM upshare_folder f 
WHERE NOT EXISTS ( 
    SELECT 1 FROM upshare_folder_relation r 
    WHERE f.folder_id = r.child_folder_id ) 
AND f.user_id = :user_id`;

const SQL2 = `
SELECT file_id, folder_id, user_id, file_name, file_extension, file_size, created_at, updated_at 
FROM upshare_file 
WHERE folder_id IS NULL 
AND user_id = :user_id`;

export const GET = auth(async function GET(req) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "[오류] 로그인이 필요한 서비스" }, { status: 401 });

  const userId = req.auth.user.id;
  const folderResult = await executeSql(SQL1, [userId]);
  const fileResult = await executeSql(SQL2, [userId]);

  return NextResponse.json(
    {
      message: "success",
      data: {
        folders: folderResult.rows,
        files: fileResult.rows,
      },
    },
    { status: 200 }
  );
});
