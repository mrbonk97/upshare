import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const DELETE = auth(async function (req, { params }) {
  console.log(req);
  console.log(params);
  return NextResponse.json({ code: "success", message: "good" }, { status: 200 });
});
