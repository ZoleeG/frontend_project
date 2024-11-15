import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from '../context/firebase-config';
import '../styles/Auth.css'
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider.jsx";
import googleIcon from '../../google-icon.png'


export default function Auth () {
  const { activeUser, setActiveUser } = useContext(UserContext);

    const signInWithGoogle = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          setActiveUser(result.user)
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        })
    }

    return (
      <li key='google-singin' onClick={signInWithGoogle}>
        <img src={googleIcon} alt="google-icon" className="dark:bg-white" />
        <p>Google account</p>
      </li>
    );
  };
    
