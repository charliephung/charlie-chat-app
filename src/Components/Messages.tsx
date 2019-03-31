import React from "react";
import useCollection from "../Hooks/useCollecton";
import useDoc from "../Hooks/useDoc";
import { IMessage, IUser } from "../types";

type IMessageWithAvatarProps = {
  message: IMessage;
  showDay: boolean;
};

const MessageWithAvatar: React.FunctionComponent<IMessageWithAvatarProps> = ({
  message,
  showDay
}) => {
  const author = useDoc<IUser>(message.user.path);

  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoURL}")` : ""
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName} </span>
            <span className="TimeStamp">3:37 PM</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

const Messages: React.FunctionComponent = () => {
  const messages: IMessage[] = useCollection(
    "channels/general/messages",
    "createdAt"
  );

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const prev = messages[index - 1];
        const showDay = false;
        const showAvatar = !prev || message.user.id !== prev.user.id;

        return showAvatar ? (
          <MessageWithAvatar key={index} showDay={showDay} message={message} />
        ) : (
          <div key={index}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
