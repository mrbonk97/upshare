import { auth } from "@/auth";
import { getDbPool } from "@/lib/db";
import { NextResponse } from "next/server";

const query = `SELECT * FROM upshare_folder f 
               WHERE NOT EXISTS ( 
                  SELECT 1 FROM upshare_folder_relation r 
                  WHERE f.folder_id = r.child_folder_id 
               ) AND f.user_id = @user_id`;

export const GET = auth(async function GET(req) {
  // prettier-ignore
  if (!req.auth || !req.auth.user) return NextResponse.json({ message: "오류: 로그인이 필요한 서비스" }, { status: 401 });

  const userId = req.auth.user.id;

  const pool = await getDbPool();
  const request = pool.request();
  request.input("user_id", userId);
  const result = await request.query(query);
  pool.close();

  return NextResponse.json(
    { message: "success", data: result.recordset },
    { status: 200 }
  );
});
