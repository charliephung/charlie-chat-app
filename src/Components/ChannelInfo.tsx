import React from "react";

const ChannelInfo = React.memo(function(props) {
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" value="Awesome stuff" />
      </div>
      <div className="ChannelName">#general</div>
    </div>
  );
});

export default ChannelInfo;
