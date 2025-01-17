import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { NextResponse } from "next/server";

const SQL = `
WITH A AS (SELECT folder_id, LEVEL AS depth 
           FROM upshare_folder_relation 
           START WITH folder_id = :folder_id 
           CONNECT BY PRIOR folder_id = child_folder_id  
) 
SELECT B.*, A.depth 
FROM A 
INNER JOIN (SELECT * FROM upshare_folder WHERE user_id = :user_id) B 
ON A.folder_id = B.folder_id 
ORDER BY depth DESC`;

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
      data: {
        structure: result.rows,
      },
    },
    { status: 200 }
  );
});
