export type UpshareUserType = {
  USER_ID: number;
  USERNAME: string;
  EMAIL: string | null;
  IMAGE: string | null;
  PASSWORD_HASH: string;
  OAUTH_PROVIDER: string;
  OAUTH_USER_ID: string | null;
  CREATED_AT: Date;
  UPDATED_AT: Date;
  IS_ACTIVE: number;
};

export type FolderType = {
  FOLDER_ID: string;
  PARENT_FOLDER_ID: string | null;
  USER_ID: string;
  FOLDER_NAME: string;
  CREATED_AT: string;
  UPDATED_AT: string;
};

export type FileType = {
  FILE_ID: string;
  USER_ID: string;
  FOLDER_ID: string;
  FILE_NAME: string;
  FILE_SIZE: number;
  FILE_EXTENSION: string;
  CREATED_AT: string;
  UPDATED_AT: string;
};
