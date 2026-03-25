import { auth } from "../firebase/config.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const provider = new GoogleAuthProvider();

// 🔐 LOGIN GOOGLE
const loginBtn = document.getElementById("googleLogin");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
      alert("Erreur connexion");
    }
  });
}

// 🔄 VÉRIFIER UTILISATEUR
onAuthStateChanged(auth, (user) => {

  if (!user && !window.location.pathname.includes("login.html")) {
    window.location.href = "login.html";
  }

});

// 🚪 LOGOUT (optionnel)
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};
