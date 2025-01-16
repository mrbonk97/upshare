import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { UpshareUserType } from "@/constants/type";
import { NextRequest, NextResponse } from "next/server";

const SQL = "SELECT * FROM upshare_user WHERE username = :username";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const username = data.username;
  const password = data.password;

  if (!username) throw new CustomError("로그인 오류", 400, "username이 없습니다");
  if (!password) throw new CustomError("로그인 오류", 400, "password가 없습니다");

  const result = await executeSql<UpshareUserType>(SQL, [username]);
  const user = result.rows![0];

  if (result.rows?.length == 0)
    throw new CustomError("로그인 오류", 401, `일치하는 아이디가 없습니다. username: ${username}`);
  if (user.IS_ACTIVE == 0)
    throw new CustomError("로그인 오류", 401, `계정이 잠겨있습니다. ID: ${user.USER_ID}`);
  if (user.OAUTH_PROVIDER != "local")
    throw new CustomError("로그인 오류", 401, `로그인 방식이 잘못되었습니다. ID: ${user.USER_ID}`);
  if (user.PASSWORD_HASH != data.password)
    throw new CustomError("로그인 오류", 401, `패스워드가 일치하지 않습니다. ID: ${user.USER_ID}`);

  return NextResponse.json(
    {
      message: "success",
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
}
