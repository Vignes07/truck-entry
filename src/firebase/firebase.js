import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC5R-d5sd3E4Rcsej8xxCJ6JZYtuO8FLFc",
    authDomain: "trucks-crm.firebaseapp.com",
    projectId: "trucks-crm",
    storageBucket: "trucks-crm.firebasestorage.app",
    messagingSenderId: "779627404202",
    appId: "1:779627404202:web:30c92dabe0260ea7f829d3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };