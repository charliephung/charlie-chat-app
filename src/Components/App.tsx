import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Channel from "./Channel";
import useCollecton from "../Hooks/useCollecton";
import firebase from "../firebase/firebase";

interface IUser {
  displayName: string;
  photoURL: string;
  uid: string;
}

const App: React.FunctionComponent = () => {
  const [user, setUser] = useState(null as IUser | null);
  const channels = useCollecton("channels");

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        setUser({
          displayName: displayName || "",
          photoURL: photoURL || "",
          uid
        });
      } else setUser(null);
    });
  }, []);

  const handleSignIn = async (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  return user ? (
    <div className="App">
      <Nav channels={channels} />
      <Channel />
    </div>
  ) : (
    <div className="Login">
      <h1>Charlie Chat</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default App;
