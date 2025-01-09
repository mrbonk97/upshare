export type FolderType = {
  folder_id: string;
  parent_folder_id: string | null;
  user_id: string;
  folder_name: string;
  created_at: string;
  updated_at: string;
};

export type FileType = {
  file_id: string;
  folder_id: string | null;
  user_id: string;
  file_name: string;
  file_url: string;
  file_size: string;
  file_type: string;
  created_at: string;
  updated_at: string;
};
