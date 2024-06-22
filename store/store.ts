import { create } from "zustand";
import createSelectors from "./selectors";
import { UserSlice, createUserSlice } from "./user-slice";
import { FileSlice, createFileSlice } from "./file-slice";
import { FolderSlice, createFolderSlice } from "./folder-slice";

interface Store extends UserSlice, FileSlice, FolderSlice {}

export const store = create<Store>((...a) => ({
  ...createUserSlice(...a),
  ...createFileSlice(...a),
  ...createFolderSlice(...a),
}));

export default createSelectors(store);
