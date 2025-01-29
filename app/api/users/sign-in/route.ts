import { executeSql } from "@/lib/db";
import { UpshareUserType } from "@/constants/type";
import { NextRequest, NextResponse } from "next/server";
import { CustomError } from "@/lib/error";

const SQL = "SELECT * FROM upshare_user WHERE username = :username";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const username = data.username;
    const password = data.password;

    if (typeof username != "string") throw new CustomError("username이 필요합니다.", 400);
    if (typeof password != "string") throw new CustomError("password가 필요합니다.", 400);

    const result = await executeSql<UpshareUserType>(SQL, [username]);

    if (!result.rows || result.rows.length != 1)
      throw new CustomError("일치하는 계정이 없습니다.", 401);

    const user = result.rows[0];

    if (user.IS_ACTIVE == 0) throw new CustomError("계정이 잠겨있습니다.", 401);
    if (user.OAUTH_PROVIDER != "local") throw new CustomError("로그인 방식이 다릅니다.", 401);
    if (user.PASSWORD_HASH != data.password)
      throw new CustomError("패스워드가 일치하지 않습니다.", 401);

    return NextResponse.json(
      {
        code: "success",
        data: {
          user: {
            id: user.USER_ID,
            name: user.USERNAME,
            email: user.EMAIL,
            image: user.IMAGE,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그인인 중 오류 발생:", error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
