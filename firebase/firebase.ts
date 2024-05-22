// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCycqgEtSECSy63qtkbKEMlCj01TSM3FU",
  authDomain: "file-storage-417205.firebaseapp.com",
  projectId: "file-storage-417205",
  storageBucket: "file-storage-417205.appspot.com",
  messagingSenderId: "537404544101",
  appId: "1:537404544101:web:39d0c014c4ce9c3b06e28c",
  measurementId: "G-NQXMPP0GVK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
