import { db, auth } from "../firebase/config.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const input = document.getElementById("messageInput");
const btn = document.getElementById("sendBtn");
const container = document.getElementById("messages");

// 🔐 vérifier user
onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
  }

});

// 📤 envoyer message
btn.addEventListener("click", async () => {

  const text = input.value;

  if (text === "") return;

  await addDoc(collection(db, "messages"), {
    text: text,
    user: auth.currentUser.displayName,
    photo: auth.currentUser.photoURL,
    createdAt: serverTimestamp()
  });

  input.value = "";
});

// 🔁 afficher messages temps réel
const q = query(collection(db, "messages"), orderBy("createdAt"));

onSnapshot(q, (snapshot) => {

  container.innerHTML = "";

  snapshot.forEach((doc) => {

    const msg = doc.data();

    container.innerHTML += `
      <div class="message">
        <img src="${msg.photo}">
        <div>
          <b>${msg.user}</b>
          <p>${msg.text}</p>
        </div>
      </div>
    `;
  });

});
