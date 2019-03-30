import React from "react";
import firebase from "../firebase/firebase";
import { IChannel, IUser } from "../interfaces";

interface IProps {
  channels: IChannel[];
  user: IUser;
}

const Nav: React.FunctionComponent<IProps> = ({ channels, user }) => {
  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt={user.displayName} src={user.photoURL} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button
              onClick={() => firebase.auth().signOut()}
              className="text-button"
            >
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(({ id }) => (
          <a key={id} href={`/channel/${id}`}>
            # {id}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
