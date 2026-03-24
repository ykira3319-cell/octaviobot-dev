import { auth, db } from "../firebase/config.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const storage = getStorage();

const form = document.getElementById("postForm");

onAuthStateChanged(auth, (user) => {

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = document.getElementById("text").value;
    const file = document.getElementById("image").files[0];

    // upload image
    const storageRef = ref(storage, "posts/" + file.name);

    await uploadBytes(storageRef, file);

    const imageURL = await getDownloadURL(storageRef);

    // save post
    await addDoc(collection(db, "posts"), {
      text: text,
      image: imageURL,
      userName: user.displayName,
      userPhoto: user.photoURL,
      createdAt: serverTimestamp()
    });

    alert("Post publié 🔥");
    form.reset();
  });

});
