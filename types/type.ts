export type user = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  role: string;
};

export type File = {
  id: string;
  type: string;
  name: string;
  size: number;
  createdAt: string;
  createdBy: string;
};
