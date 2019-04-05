import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Channel from "./Channel";
import useCollecton from "../Hooks/useCollecton";
import firebase, { db } from "../firebase/firebase";
import { IUser, IChannel } from "../types";
import { Router, Redirect } from "@reach/router";

const useAuth: Function = (): IUser | null => {
  const [user, setUser] = useState(null as IUser | null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user: IUser = {
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || "",
          uid: firebaseUser.uid
        };

        setUser(user);

        db.collection("users")
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

const Login: React.FunctionComponent = () => {
  const [error, setError] = useState<any | null>(null);

  const handleSignIn = async (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="Login">
      <h1>Charlie Chat</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {error && (
        <>
          <p>
            <strong>Sorry, there was a problem</strong>
          </p>
          <p>
            <i>{error.message}</i>
          </p>
          <p>Please try again!</p>
        </>
      )}
    </div>
  );
};

const App: React.FunctionComponent = () => {
  const channels = useCollecton<IChannel>("channels");
  const user = useAuth();
  return user ? (
    <div className="App">
      <Nav user={user} channels={channels} />
      <Router>
        <Channel path="channel/:channelId" user={user} />
        <Redirect from="/" to="channel/general" />
      </Router>
    </div>
  ) : (
    <Login />
  );
};

export default App;
