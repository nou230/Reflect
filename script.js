// app.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc } 
  from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تبديل الصفحات
function navigateTo(page) {
  document.getElementById("login-page").style.display = "none";
  document.getElementById("email-login-page").style.display = "none";
  document.getElementById("app-page").style.display = "none";

  if (page === "email") {
    document.getElementById("email-login-page").style.display = "block";
  } else if (page === "app") {
    document.getElementById("app-page").style.display = "block";
  }
}

function goBack() {
  navigateTo("login");
}

// تسجيل الدخول بالبريد الإلكتروني
document.getElementById("email-login-btn").addEventListener("click", () => {
  navigateTo("app");
});

// إنشاء مجموعة
document.getElementById("create-group-btn").addEventListener("click", async () => {
  const groupName = document.getElementById("group-name").value;

  try {
    const groupRef = await addDoc(collection(db, "groups"), { name: groupName });
    alert(`تم إنشاء المجموعة بنجاح! معرف المجموعة: ${groupRef.id}`);
    document.getElementById("group-name").value = "";
  } catch (error) {
    alert("خطأ أثناء إنشاء المجموعة: " + error.message);
  }
});

// الانضمام إلى مجموعة
document.getElementById("join-group-btn").addEventListener("click", async () => {
  const groupId = document.getElementById("group-id").value;

  try {
    currentGroupId = groupId;
    document.getElementById("current-group-name").textContent = groupId;
    loadPosts();
  } catch (error) {
    alert("خطأ أثناء الانضمام إلى المجموعة: " + error.message);
  }
});

// نشر منشور جديد
document.getElementById("add-post-btn").addEventListener("click", async () => {
  const content = document.getElementById("post-content").value;

  try {
    await addDoc(collection(db, `groups/${currentGroupId}/posts`), { content, timestamp: Date.now() });
    document.getElementById("post-content").value = "";
    alert("تم نشر المنشور بنجاح!");
  } catch (error) {
    alert("خطأ أثناء نشر المنشور: " + error.message);
  }
});

// تحميل المنشورات
function loadPosts() {
  const postsContainer = document.getElementById("posts");
  const postsQuery = collection(db, `groups/${currentGroupId}/posts`);

  onSnapshot(postsQuery, (snapshot) => {
    postsContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const post = doc.data();
      const postElement = document.createElement("div");
      postElement.textContent = post.content;
      postsContainer.appendChild(postElement);
    });
  });
}
