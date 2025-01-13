// تسجيل الدخول
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    alert("تم تسجيل الدخول بنجاح!");
    document.getElementById("login-screen").classList.add("d-none");
    document.getElementById("app-content").classList.remove("d-none");
  } else {
    alert("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
  }
});

document.getElementById("logout-button").addEventListener("click", () => {
  document.getElementById("login-screen").classList.remove("d-none");
  document.getElementById("app-content").classList.add("d-none");
});

// نشر الوسائط
document.getElementById("upload-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("media-title").value;
  const file = document.getElementById("media-file").files[0];
  const category = document.getElementById("media-category").value;

  if (file.size > 10 * 1024 * 1024) {
    alert("الملف كبير جدًا!");
    return;
  }

  const mediaContainer = document.getElementById("media-container");
  const mediaElement = document.createElement(file.type.startsWith("image/") ? "img" : "video");

  mediaElement.src = URL.createObjectURL(file);
  mediaElement.controls = true;

  const mediaCard = document.createElement("div");
  mediaCard.innerHTML = `<h4>${title}</h4><p>التصنيف: ${category}</p>`;
  mediaCard.appendChild(mediaElement);

  mediaContainer.appendChild(mediaCard);
});

// المجموعات والدردشة
document.getElementById("create-group").addEventListener("click", () => {
  const groupName = prompt("أدخل اسم المجموعة:");
  if (groupName) {
    const groupContainer = document.getElementById("group-container");
    const groupCard = document.createElement("div");
    groupCard.textContent = groupName;
    groupCard.addEventListener("click", () => openChat(groupName));
    groupContainer.appendChild(groupCard);
  }
});

function openChat(groupName) {
  document.getElementById("chat-section").classList.remove("d-none");
  document.getElementById("group-name").textContent = groupName;
}

document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("chat-input").value;
  const chatMessages = document.getElementById("chat-messages");

  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);

  document.getElementById("chat-input").value = "";
}

// مساعد الذكاء الاصطناعي
document.getElementById("ai-submit").addEventListener("click", () => {
  const input = document.getElementById("ai-input").value;
  const responseContainer = document.getElementById("ai-response");

  responseContainer.textContent = `تحليل الذكاء الاصطناعي: ${input}`;
});
