import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJK0Ey5iAf1qQ77N1Trj8sLQJYu_7fWvE",
    authDomain: "chat-6a250.firebaseapp.com",
    projectId: "chat-6a250",
    storageBucket: "chat-6a250.appspot.com",
    messagingSenderId: "406682517423",
    appId: "1:406682517423:web:ef7ad0f14971dcbb14b95a",
    measurementId: "G-14VGP98HY9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();