import React from "react";
import useDoc from "../Hooks/useDoc";
import { TChannel } from "../types";

type Props = {
  channelId: string;
};

const ChannelInfo: React.FunctionComponent<Props> = ({ channelId }) => {
  const channel = useDoc<TChannel>(`channels/${channelId}`);
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{" "}
        <input className="TopicInput" defaultValue={channel && channel.topic} />
      </div>
      <div className="ChannelName"># {channelId}</div>
    </div>
  );
};

export default ChannelInfo;
