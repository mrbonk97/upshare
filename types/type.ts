export type user = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  role: string;
};

export type File = {
  contentType: string;
  id: string;
  originalFileName: string;
  size: number;
  updatedAt: string;
  type: "FILE" | "FOLDER";
  code: string;
  username: string;
};

export interface AuthContextProps {
  isLoggedIn: boolean;
  user: user | null;
  signIn: () => Promise<boolean>;
  signOut: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export type FolderBreadCrumbType = {
  folder_name: string;
  id: string;
};
