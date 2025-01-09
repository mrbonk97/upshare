import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(function GET(req) {
  console.log(req.auth);
  if (req.auth) return NextResponse.json("로그인 성공");
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});
