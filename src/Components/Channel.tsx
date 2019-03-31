import React from "react";
import ChannelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";
import { IUser } from "../types";

interface IProps {
  user: IUser;
}

const Channel: React.FunctionComponent<IProps> = ({ user }) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo topic="Not Yet" />
        <Messages />
        <ChatInputBox user={user} />
      </div>
      <Members />
    </div>
  );
};

export default Channel;
