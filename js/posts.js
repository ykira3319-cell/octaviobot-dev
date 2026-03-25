import { getPosts } from "../firebase/dbService.js";
import { db, auth } from "../firebase/config.js";

import {
  doc,
  updateDoc,
  increment,
  onSnapshot,
  collection,
  addDoc,
  query
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const container = document.getElementById("postsContainer");

// LOAD POSTS
async function loadPosts() {

  const snapshot = await getPosts();

  container.innerHTML = "";

  snapshot.forEach((docSnap) => {

    const post = docSnap.data();
    const postId = docSnap.id;

    container.innerHTML += `
      <div class="post">

        <div class="post-header">
          <img src="${post.userPhoto}" />
          <span>${post.userName}</span>
        </div>

        <p>${post.text}</p>

        <img class="post-img" src="${post.image}" />

        <div class="actions">
          <button onclick="likePost('${postId}')">❤️ Like</button>
          <span id="likes-${postId}">0</span>
        </div>

        <div class="comments">
          <input type="text" id="comment-${postId}" placeholder="Commenter...">
          <button onclick="addComment('${postId}')">Envoyer</button>

          <div id="comments-${postId}"></div>
        </div>

      </div>
    `;

    listenLikes(postId);
    listenComments(postId);

  });

}

loadPosts();

// LIKE
window.likePost = async (postId) => {
  const ref = doc(db, "posts", postId);
  await updateDoc(ref, { likes: increment(1) });
};

// REALTIME LIKE
function listenLikes(postId) {
  const ref = doc(db, "posts", postId);

  onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      document.getElementById("likes-" + postId).innerText =
        snap.data().likes || 0;
    }
  });
}

// COMMENT
window.addComment = async (postId) => {

  const input = document.getElementById("comment-" + postId);
  const text = input.value;

  if (!text) return;

  await addDoc(collection(db, "posts", postId, "comments"), {
    text,
    user: auth.currentUser.displayName
  });

  input.value = "";
};

// REALTIME COMMENTS
function listenComments(postId) {

  const q = query(collection(db, "posts", postId, "comments"));

  onSnapshot(q, (snap) => {

    const div = document.getElementById("comments-" + postId);
    div.innerHTML = "";

    snap.forEach((doc) => {
      const c = doc.data();
      div.innerHTML += `<p><b>${c.user}</b>: ${c.text}</p>`;
    });

  });c
}
