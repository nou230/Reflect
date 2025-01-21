// app.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
         signInWithPopup, GoogleAuthProvider, signInAnonymously, RecaptchaVerifier, 
         signInWithPhoneNumber } 
  from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxT8COg5sXyv6FUjQ_8o-P2REI1PBS7WQ",
  authDomain: "reflect-b604d.firebaseapp.com",
  projectId: "reflect-b604d",
  storageBucket: "reflect-b604d.appspot.com",
  messagingSenderId: "279668724991",
  appId: "1:279668724991:web:d6eb096d05bc6a4375e8ca",
  measurementId: "G-9GY993FC5V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Email/Password Signup
document.getElementById("email-signup").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert(`تم إنشاء الحساب بنجاح! المستخدم: ${userCredential.user.email}`);
  } catch (error) {
    alert(`خطأ: ${error.message}`);
  }
});

// Email/Password Login
document.getElementById("email-login").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`تم تسجيل الدخول بنجاح! المستخدم: ${userCredential.user.email}`);
  } catch (error) {
    alert(`خطأ: ${error.message}`);
  }
});

// Google Login
document.getElementById("google-login-btn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    alert(`تم تسجيل الدخول باستخدام Google! المستخدم: ${result.user.displayName}`);
  } catch (error) {
    alert(`خطأ: ${error.message}`);
  }
});

// Anonymous Login
document.getElementById("anonymous-login-btn").addEventListener("click", async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    alert(`تم تسجيل الدخول كضيف!`);
  } catch (error) {
    alert(`خطأ: ${error.message}`);
  }
});

// Phone Authentication
const appVerifier = new RecaptchaVerifier("recaptcha-container", {}, auth);

document.getElementById("send-code").addEventListener("click", async () => {
  const phoneNumber = document.getElementById("phone-number").value;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    alert("تم إرسال رمز التحقق! أدخل الرمز لتأكيد الحساب.");
    window.confirmationResult = confirmationResult;
  } catch (error) {
    alert(`خطأ: ${error.message}`);
  }
});

document.getElementById("verify-code").addEventListener("click", async () => {
  const code = document.getElementById("verification-code").value;

  try {
    const result = await window.confirmationResult.confirm(code);
    alert(`تم تسجيل الدخول باستخدام الهاتف! المستخدم: ${result.user.phoneNumber}`);
  } catch (error) {
    alert(`خطأ: ${error.message}`);
  }
});
