export type user = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string | null;
  uid: string | null;
};

export type File = {
  id: string;
  type: string;
  name: string;
  size: number;
  createdAt: string;
  createdBy: string;
};
