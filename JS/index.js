
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword
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

// Initialize
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const DB = getFirestore(app);
const userColRef = collection(DB, "user");

const signupFormEl = document.getElementById("signUpForm");

signupFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Form values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("emailInp").value.trim();
  const phone = document.getElementById("phoneNumberInp").value.trim();
  const password = document.getElementById("passwordInp").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value;
  const address = document.getElementById("address").value.trim();
  const errorEl = document.getElementById("error-message");
  const signupBtn = document.getElementById("signup-btn");

  // UI feedback
  errorEl.textContent = "";
  signupBtn.textContent = "Signing Up...";
  signupBtn.disabled = true;

  // Validation
  if (!fullName || !email || !phone || !password || !age || gender === "select" || !address) {
    errorEl.textContent = "Please fill in all fields.";
    signupBtn.textContent = "Sign Up";
    signupBtn.disabled = false;
    return;
  }

  if (phone.length !== 11) {
    errorEl.textContent = "Phone number must be exactly 11 digits.";
    signupBtn.textContent = "Sign Up";
    signupBtn.disabled = false;
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
    const user = userCredential.user;

    const userData = {
      id: user.uid,
      name: fullName,
     
    };

    // Try writing to Firestore
    try {
      const userRef = doc(DB, "user", user.uid);
      await setDoc(userRef, userData);
    } catch (firestoreError) {
      console.error("Firestore write failed:", firestoreError);
      errorEl.textContent = "Could not save user data to database.";
      return;
    }

    // Store name locally
    localStorage.setItem("username", fullName);

    // Display name
    const emmexEl = document.getElementById("emmex");
    if (emmexEl) {
      emmexEl.textContent = `Welcome, ${fullName}`;
    }

    // Redirect
    window.location.href = "./shop.html";
  } catch (authError) {
    console.error("Signup error:", authError);
    errorEl.textContent = authError.message;
  } finally {
    signupBtn.textContent = "Sign Up";
    signupBtn.disabled = false;
  }
});

// Show username on page load
window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("username");
  const emmexEl = document.getElementById("emmex");
  if (name && emmexEl) {
    emmexEl.textContent = `Welcome, ${name}`;
  }
});
















import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const signinForm = document.getElementById("signInForm");
const signinEmail = document.getElementById("signinEmail");
const signinPassword = document.getElementById("signinPassword");
const signinErrorEl = document.getElementById("signin-error");

if (signinForm) {
  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = signinEmail.value.trim();
    const password = signinPassword.value.trim();

    if (!email || !password) {
      if (signinErrorEl) signinErrorEl.textContent = "Please enter both email and password.";
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;

      // Get user name from Firestore
      const userDoc = await getDoc(doc(DB, "user", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem("username", userData.name);

        const emmexEl = document.getElementById("emmex");
        if (emmexEl) {
          emmexEl.textContent = `Welcome, ${userData.name}`;
        }
      }

      // Redirect to shop page
      window.location.href = "../HTML/shop.html";
    } catch (error) {
      console.error("Sign-in error:", error);
      if (signinErrorEl) signinErrorEl.textContent = error.message;
    }
  });
}







































    
    


