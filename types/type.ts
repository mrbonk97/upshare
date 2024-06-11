export type User = {
  id: string;
  name: string;
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
  code: string;
  username: string;
};

export interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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

export type RouteProps = {
  path: string;
  folderId: string | null;
  query: string | null;
};
