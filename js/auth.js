import { loginWithGoogle, logout } from "../firebase/authService.js";

// LOGIN
const btn = document.getElementById("googleLogin");

if (btn) {
  btn.onclick = async () => {
    await loginWithGoogle();
    window.location.href = "index.html";
  };
}

// LOGOUT GLOBAL
window.logoutUser = async () => {
  await logout();
  window.location.href = "login.html";
};
