import { auth } from "@/auth";
import { getDbPool } from "@/lib/db";
import { NextResponse } from "next/server";

const query = `SELECT A.* FROM upshare_folder A 
               INNER JOIN ( 
                  SELECT child_folder_id 
                  FROM upshare_folder_relation 
                  WHERE folder_id = @folder_id 
               ) B 
                ON A.folder_id = B.child_folder_id 
                WHERE A.user_id = @user_id`;

export const GET = auth(async function GET(req, { params }) {
  // prettier-ignore
  if (!req.auth || !req.auth.user) return NextResponse.json({ message: "오류: 로그인이 필요한 서비스" }, { status: 401 });

  const folderId = (await params)!.id;
  const userId = req.auth.user.id;

  const pool = await getDbPool();
  const request = pool.request();
  request.input("user_id", userId);
  request.input("folder_id", folderId);
  const result = await request.query(query);
  pool.close();

  return NextResponse.json(
    { message: "success", data: result.recordset },
    { status: 200 }
  );
});
