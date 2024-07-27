import { FileSlice } from "@/store/file-slice";
import { UserSlice } from "@/store/user-slice";
import { FileType } from "lucide-react";

export type User = {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
  role: string;
  size: number;
  maxSize: number;
};

export type FileType = {
  id: string;
  originalFilename: string;
  contentType: string;
  size: number;
  updatedAt: string;
  username: string;
  code: string | null;
  heart: boolean;
};

export type FolderType = {
  id: string;
  folderName: string;
  parentFolderId: string;
  username: string;
  heart: boolean;
  updatedAt: string;
};

export type RowType = FileType & FolderType;

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
