import { executeSql } from "@/lib/db";
import { UpshareUserType } from "@/constants/type";
import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/lib/error";

const SQL =
  "INSERT INTO upshare_user(username, password_hash, oauth_provider) VALUES(:user_name, :password, 'local')";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const username = data.username;
    const password = data.password;

    if (typeof username != "string") throw new CustomError("username이 필요합니다.", 400);
    if (username.length < 2) throw new CustomError("username이 너무 짧습니다.", 400);
    if (username.length > 30) throw new CustomError("username이 너무 깁니다.", 400);
    if (typeof password != "string") throw new CustomError("password가 필요합니다.", 400);
    if (password.length < 2) throw new CustomError("password가 너무 짧습니다.", 400);
    if (password.length > 30) throw new CustomError("password가 너무 깁니다.", 400);

    await executeSql<UpshareUserType>(SQL, [username, password], true);

    return NextResponse.json({ code: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });

    if (error instanceof Error && error.message.startsWith("ORA-00001"))
      return NextResponse.json(
        { code: "error", message: "아이디가 이미 사용중입니다." },
        { status: 500 }
      );

    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
