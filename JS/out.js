import {
  getFirestore,
  collection,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBgQt_33paLQQOsqMJKTc3HiORVHi73BCU",
    authDomain: "zeema-98697.firebaseapp.com",
    projectId: "zeema-98697",
    storageBucket: "zeema-98697.firebasestorage.app",
    messagingSenderId: "673523717659",
    appId: "1:673523717659:web:8b68d151c76de917580abe",
    measurementId: "G-QBESD03ZTN"
};
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);



const logout =  document.getElementById("logout");

const handleLogout = async () => {
    try {
        await signOut(Auth);
        console.log("User signed out successfully");
        window.location.href = "../index.html";
    } catch (error) {
        console.error(error);
    }
}
logout.addEventListener("click", handleLogout);  

