import { storage } from "./config.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

export const uploadImage = async (file) => {

  const storageRef = ref(storage, "posts/" + file.name);

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
};
