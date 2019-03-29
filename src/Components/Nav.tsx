import React from "react";

interface IChannel {
  id: string;
}
interface IProps {
  channels: IChannel[];
}

const Nav: React.FunctionComponent<IProps> = ({ channels }) => {
  return (
    <div className="Nav">
      <div className="User">
        <img
          className="UserImage"
          alt="whatever"
          src="https://placekitten.com/64/64"
        />
        <div>
          <div>Charlie Phung</div>
          <div>
            <button className="text-button">log out</button>
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
