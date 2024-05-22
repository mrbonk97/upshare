import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "@/firebase/firebase";

import { setPersistence, browserLocalPersistence } from "firebase/auth";

export const googleSignIn = () => {
  setPersistence(firebaseAuth, browserLocalPersistence)
    .then(() => {
      const provider = new GoogleAuthProvider();
      return signInWithRedirect(firebaseAuth, provider);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const githubSignIn = () => {
  setPersistence(firebaseAuth, browserLocalPersistence)
    .then(() => {
      const provider = new GithubAuthProvider();
      return signInWithRedirect(firebaseAuth, provider);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const firebaseSignOut = async () => {
  return signOut(firebaseAuth);
};
