import React, { useEffect } from "react";
import ChannelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";
import { TUser } from "../types";
import { db } from "../firebase/firebase";
import { RouteComponentProps } from "@reach/router";

type Props = {
  user: TUser;
  path: string;
};
type ChannelProps = Props & RouteComponentProps<{ channelId?: string }>;

const Channel: React.FunctionComponent<ChannelProps> = ({
  channelId = "",
  user
}) => {
  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true
    });
  }, [user.uid, channelId]);

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelId={channelId} />
        <Messages channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  );
};

export default Channel;
