import { FileSlice } from "@/store/file-slice";
import { UserSlice } from "@/store/user-slice";

export type User = {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
  role: string;
  size: number;
  maxSize: number;
};

export type File = {
  contentType: string;
  id: string;
  originalFileName: string;
  size: number;
  updatedAt: string;
  type: "FILE" | "FOLDER";
  code: string | null;
  username: string;
  heart: boolean;
};

export type FolderBreadCrumbType = {
  folder_name: string;
  id: string;
};

export enum modalType {
  "DELETE",
  "SHARE",
  "SHARE_STOP",
  "UPLOAD_FILE",
  "CREATE_FOLDER",
}
