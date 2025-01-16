"use server";
import { getDb } from "@/lib/db";
import { CustomError } from "@/lib/error";

const query = `INSERT INTO upshare_user(username, password_hash, oauth_provider) 
                VALUES(:username, :password_hash, 'local')`;

export const SignUpAction = async (username: string, password: string) => {
  if (!username) throw new CustomError("필드가 비어있습니다.", 400, "username");
  if (!password) throw new CustomError("필드가 비어있습니다.", 400, "password");
  const conn = await getDb();

  try {
    const result = await conn.execute(
      query,
      { username, password_hash: password },
      { resultSet: true }
    );

    if (result.rowsAffected === 1) await conn.commit();
    else throw new CustomError("회원가입 처리 중 오류가 발생했습니다.", 400);
    console.log("[INFO] 유저 회원가입: ", result);
  } catch (e: any) {
    if (e instanceof CustomError) throw e;
    if (e.message.includes("ORA-00001"))
      throw new CustomError("이미 존재하는 사용자명입니다.", 400, "username");
    throw new CustomError("원인 불명", 500);
  } finally {
    await conn.close();
  }

  return {
    message: "회원가입 성공",
  };
};
