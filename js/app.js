import { auth } from "../firebase/config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// LOADER
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 3000);
});

// USER
onAuthStateChanged(auth, (user) => {

  if (user) {
    document.getElementById("userName").innerText = user.displayName;
    document.getElementById("userPhoto").src = user.photoURL;
  } else {
    window.location.href = "login.html";
  }

});
