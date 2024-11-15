import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDPZnLJXvkBMqFQGi8HIWlW2h15ZKeVNcI",
  authDomain: "ncnews-9ae89.firebaseapp.com",
  projectId: "ncnews-9ae89",
  storageBucket: "ncnews-9ae89.appspot.com",
  messagingSenderId: "645634228058",
  appId: "1:645634228058:web:6bd2d1312897abf5207d63"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}
