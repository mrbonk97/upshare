import { auth } from "@/auth";
import { executeSql } from "@/lib/db";
import { CustomError } from "@/lib/error";
import { NextResponse } from "next/server";

export const PATCH = auth(async function (req, { params }) {
  try {
    if (!req.auth || !req.auth.user || !req.auth.user.id)
      throw new CustomError("로그인이 필요합니다.", 401);

    // 요청 데이터 파싱
    const userId = req.auth.user.id;
    const { id: folderId } = await params!; // childFolderId
    const { id: parentFolderId, name } = await req.json(); // parentFolderId

    if (!folderId) throw new CustomError("폴더 id가 필요합니다.", 400);
    if (Array.isArray(folderId)) throw new CustomError("폴더 형식이 잘못되었습니다.", 400);

    if (name) await UpdateName(name, folderId, userId);
    if (parentFolderId) await UpdateFolder(folderId, parentFolderId);

    return NextResponse.json({ code: "success", message: "success" }, { status: 200 });
  } catch (error) {
    console.error("폴더 및 파일 수정 중 오류 발생:", error);
    if (error instanceof CustomError)
      return NextResponse.json({ code: "error", message: error.cause }, { status: error.code });
    return NextResponse.json(
      { code: "error", message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
});

const SQL1 = `UPDATE upshare_folder SET folder_name = :folder_name WHERE folder_id = :folder_id AND user_id = :user_id`;
const UpdateName = async (folderName: string, folderId: string, userId: string) => {
  if (typeof folderName != "string") throw new CustomError("폴더 이름 형식이 잘못됐습니다.", 400);
  if (folderName.length < 2) throw new CustomError("폴더 이름이 너무 짧습니다.", 400);
  if (folderName.length > 100) throw new CustomError("폴더 이름이 너무 깁니다.", 400);
  await executeSql(SQL1, [folderName, folderId, userId], true);
};

// 폴더를 다른 폴더로 이동시킬 때
const SQL2 = `DELETE FROM upshare_folder_relation WHERE child_folder_id = :child_folder_id`;
const SQL3 = `INSERT INTO upshare_folder_relation(folder_id, child_folder_id) VALUES(:folder_id, :child_folder_id)`;

const UpdateFolder = async (childFolderId: string, parentFolderId: string) => {
  if (childFolderId == parentFolderId) throw new CustomError(" 폴더 아이디가 동일합니다.", 400);
  await executeSql(SQL2, [childFolderId], true);
  // 홈이 아니면 실행
  if (parentFolderId != "-1") await executeSql(SQL3, [parentFolderId, childFolderId], true);
};
