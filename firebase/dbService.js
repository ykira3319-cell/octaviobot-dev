import { db } from "./config.js";

import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ajouter post
export const addPost = async (data) => {
  return await addDoc(collection(db, "posts"), data);
};

// récupérer posts
export const getPosts = async () => {
  return await getDocs(collection(db, "posts"));
};
