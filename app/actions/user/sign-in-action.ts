"use server";
import { getConnection } from "@/lib/db";
import { User } from "next-auth";

const query = "SELECT * FROM upshare_user WHERE username = @username";

export const signInAction = async (username: any, password: any) => {
  console.log("히히히");
  if (!username) throw new Error("유저 이름이 비어있습니다");

  // const pool = await getConnection();
  // const request = pool.request();

  // request.input("username", username);
  // const result = await request.query(query);

  // if (result.rowsAffected[0] == 0)
  //   throw new Error("오류: [로그인] 일치하는 계정이 없습니다.");

  // if (result.rowsAffected[0] > 1)
  //   throw new Error("오류: [로그인] 일치하는 계정이 너무 많습니다.");

  // if (!result.recordset[0].is_active)
  //   throw new Error("오류: [로그인] 계정이 잠겨있습니다.");

  // if (result.recordset[0].oauth_provider != "local")
  //   throw new Error("오류: [로그인] 로그인 방식이 잘못되었습니다.");

  // if (result.recordset[0].password_hash != password)
  //   throw new Error("오류: [로그인] 패스워드가 일치하지 않습니다.");

  // const user: User = {
  //   id: result.recordset[0].user_id,
  //   image: result.recordset[0].user_id,
  //   name: result.recordset[0].username,
  //   email: result.recordset[0].email,
  // };

  return null;
};
