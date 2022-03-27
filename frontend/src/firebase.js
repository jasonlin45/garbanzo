import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBecNd5K5BzL2KYsDpqVj_G382NFlqUIQc",
  authDomain: "mosaic-bf6d2.firebaseapp.com",
  projectId: "mosaic-bf6d2",
  storageBucket: "mosaic-bf6d2.appspot.com",
  messagingSenderId: "648854821311",
  appId: "1:648854821311:web:e272c430ee49bd8e5fe90a"
};

// const firebaseConfig = {

//   apiKey: "AIzaSyBQq4NOG1WfBQTcZ-fqqcI2KhO6PvAC01Q",

//   authDomain: "mosaicbucket-e0492.firebaseapp.com",

//   projectId: "mosaicbucket-e0492",

//   storageBucket: "mosaicbucket-e0492.appspot.com",

//   messagingSenderId: "33191787938",

//   appId: "1:33191787938:web:bb07a5f47ee070433346fb"

// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
