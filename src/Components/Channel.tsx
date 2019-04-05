import React from "react";
import ChannelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";
import { IUser } from "../types";
import { RouteComponentProps } from "@reach/router";

type Props = {
  user: IUser;
  path: string;
};
type ChannelProps = Props & RouteComponentProps<{ channelId?: string }>;

const Channel: React.FunctionComponent<ChannelProps> = ({
  channelId = "",
  user
}) => {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members />
    </div>
  );
};

export default Channel;
