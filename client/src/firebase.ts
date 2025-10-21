import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfgB30Mbv7ArfxGBi3kuECFV_5qxn6UqM",
  authDomain: "johncis.firebaseapp.com",
  projectId: "johncis",
  storageBucket: "johncis.firebasestorage.app",
  messagingSenderId: "841842936364",
  appId: "1:841842936364:web:316516ba37e47f4e105f89",
  measurementId: "G-12RB0V3P61"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
