import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBPRTS91_FANU8aAGcOq6WxqqZO_gzXbRM",
  authDomain: "vollyball-tournaments.firebaseapp.com",
  projectId: "vollyball-tournaments",
  storageBucket: "vollyball-tournaments.appspot.com",
  messagingSenderId: "240812535207",
  appId: "1:240812535207:web:791bcab3d29254b22a9a82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
