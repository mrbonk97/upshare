"use server";
import { getDbPool } from "@/lib/db";

const query = `INSERT INTO upshare_user(username, password_hash, oauth_provider) 
                VALUES(@username, @password_hash, 'local')`;

export const SignUpAction = async (username: string, password: string) => {
  if (!username) throw new Error("유저 이름이 비어있습니다");
  if (!password) throw new Error("패스워드가 비어있습니다");

  const pool = await getDbPool();

  const request = pool.request();
  request.input("username", username);
  request.input("password_hash", password);

  const result = await request.query(query);

  if (result.rowsAffected[0] != 1) throw new Error("회원가입 중 오류 발생");

  return {
    status: "회원가입 성공",
  };
};
