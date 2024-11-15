import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import "../styles/Users.css";
import FloatingActionBtn from "./FloatingActionBtn";
import { getUsers } from "../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./Auth";
import { auth } from "../context/.auth_config/firebase-config";
import { lineSpinner } from "ldrs";

lineSpinner.register();

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const [signUp, setSignUp] = useState(false);
  const location = useLocation()

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  });

  if (isLoading) {
    return (
      <div className="spinner">
        <l-line-spinner
          size="40"
          stroke="3"
          speed="1"
          color="black"
        ></l-line-spinner>
      </div>
    );
  }

  function handleLogInClick(user) {
    setActiveUser(user);
    setSignUp(false);
  }

  function handleSignUpClick() {
    setSignUp(true);
  }

  function signOutFromGoogle() {
    signOut(auth)
      .then(() => {
        setActiveUser()
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  }

  return (
    <section className="user-page">
      {activeUser ? (
            <h1 className="font-extrabold text-3xl text-center py-4">
              Hello {activeUser.displayName || activeUser.username}!
            </h1>
          ) : (
            <h1 className="font-extrabold text-3xl text-center py-4">Hello!</h1>
          )}
        
      

      <h2 className="font-extrabold text-3xl text-center py-4">Log In</h2>
      <ul className="user-list">
        {users.map((user) => {
          return (
            <li key={user.username} onClick={() => handleLogInClick(user)}>
              <img
                src={user.avatar_url}
                className="dark:bg-white"
                alt="avatar image"
              />
              <p id="username">{user.username}</p>
            </li>
          );
        })}
        <Auth />
      </ul>
      <div className="flex justify-center pb-[2rem] mt-[2rem]">
        {activeUser ? <button onClick={signOutFromGoogle}>Sign out</button> : null}
      </div>

      {!activeUser ? (<div className="flex justify-center pb-[3rem]">
        <button className="text-[#DD3232]" onClick={handleSignUpClick}>
          New user? Sign Up Here
        </button>
      </div>) : (<div className="flex justify-center pb-[3rem] text-secondary">
         You are signed in {activeUser.username || activeUser.displayName}
      </div>)}
      <div className="fixed bottom-5 right-5 p-[1rem]">
        <FloatingActionBtn />
      </div>
    </section>
  );
}
