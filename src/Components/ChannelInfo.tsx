import React from "react";

type Props = {
  topic: string;
};

const ChannelInfo: React.FunctionComponent<Props> = ({ topic }) => {
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" value="Awesome stuff" />
      </div>
      <div className="ChannelName"># {topic}</div>
    </div>
  );
};

export default ChannelInfo;
