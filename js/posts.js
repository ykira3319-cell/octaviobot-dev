import { db } from "../firebase/config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.getElementById("postsContainer");

async function loadPosts() {

  const querySnapshot = await getDocs(collection(db, "posts"));

  container.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const post = doc.data();

    container.innerHTML += `
      <div class="post">
        
        <div class="post-header">
          <img src="${post.userPhoto}" />
          <span>${post.userName}</span>
        </div>

        <p>${post.text}</p>

        <img class="post-img" src="${post.image}" />

        <div class="actions">
          <button>❤️ Like</button>
          <button>💬 Commenter</button>
        </div>

      </div>
    `;
  });

}

loadPoloadPosts
