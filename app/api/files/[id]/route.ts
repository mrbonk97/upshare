import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { NextResponse } from "next/server";

const SQL1 = `
SELECT A.* FROM upshare_folder A 
INNER JOIN (  SELECT child_folder_id 
              FROM upshare_folder_relation 
              WHERE folder_id = :folder_id ) B 
ON A.folder_id = B.child_folder_id 
WHERE A.user_id = :user_id`;

const SQL2 = `
SELECT file_id, folder_id, user_id, file_name, file_extension, file_size, created_at, updated_at 
FROM upshare_file 
WHERE folder_id = :folder_id 
AND user_id = :user_id`;

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth || !req.auth.user)
    return NextResponse.json({ message: "[오류] 로그인이 필요한 서비스" }, { status: 401 });

  const folderId = (await params)!.id;
  const userId = req.auth.user.id;

  const folderResult = await executeSql(SQL1, [folderId, userId]);
  const fileResult = await executeSql(SQL2, [folderId, userId]);

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
