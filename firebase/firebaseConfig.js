import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdf58XGapwzPaW2j_C9cZafIyguyjZIzY",
  authDomain: "f1-app-2816f.firebaseapp.com",
  projectId: "f1-app-2816f",
  storageBucket: "f1-app-2816f.appspot.com",
  messagingSenderId: "650799204058",
  appId: "1:650799204058:web:090949bb2a7a7518e587e3",
  measurementId: "G-65YZ5M698E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);


export { app, analytics };
