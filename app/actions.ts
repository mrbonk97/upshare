"use server";
import { User } from "next-auth";

export async function createFolder(data: FormData) {
  console.log(data);
}

export const getUserFromDb = async (
  username: any,
  password: any
): Promise<User> => {
  const result = await Promise.all([() => console.log(username, password)]);
  console.log(result);
  const u: User = {
    id: "asd",
    name: "asd",
    email: "asd",
    image: "asd",
  };

  return u;
};
