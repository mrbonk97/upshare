import { auth } from "@/auth";
import { getConnection } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const query = "SELECT * FROM upshare_file where parent_id IS NULL";

export const GET = async (req: NextRequest, res: NextResponse) => {
  console.log(req);
  const session = await auth();
  console.log(session);

  const pool = await getConnection();
  const request = pool.request();
};
