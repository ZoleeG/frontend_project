import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDt8D8JpbdjrCgH544aATrraAlanDjh0RY",
  authDomain: "zoleeg-ncnews.firebaseapp.com",
  projectId: "zoleeg-ncnews",
  storageBucket: "zoleeg-ncnews.firebasestorage.app",
  messagingSenderId: "1006666902301",
  appId: "1:1006666902301:web:d47dfa312ea1b41f0f0ff4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}
