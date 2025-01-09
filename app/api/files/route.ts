import { auth } from "@/auth";
import { getDbPool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const query = "SELECT * FROM upshare_file where parent_id IS NULL";

export const GET = async (req: NextRequest, res: NextResponse) => {
  console.log(req);
  const session = await auth();
  console.log(session);

  const pool = await getDbPool();
  const request = pool.request();
};
