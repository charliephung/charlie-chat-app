import React, { useRef, useEffect, Ref, ReactHTMLElement } from "react";
import useCollection from "../Hooks/useCollecton";
import useDocWithCache from "../Hooks/useDocWithCache";
import { IMessage, IUser } from "../types";
import format from "date-fns/format";
import isSameDay from "date-fns/is_same_day";

type IMessageWithAvatarProps = {
  message: IMessage;
  showDay: boolean;
};

const MessageWithAvatar: React.FunctionComponent<IMessageWithAvatarProps> = ({
  message,
  showDay
}) => {
  const author = useDocWithCache<IUser>(message.user.path);

  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}
          </div>
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
            <span className="TimeStamp">
              {format(message.createdAt.seconds * 1000, "h:mm A")}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

type MessagesProps = {
  channelId: string;
};

const shouldShowDate = (
  prev: IMessage | undefined,
  message: IMessage
): boolean => {
  if (prev === undefined) return true;

  const isNextDay = !isSameDay(
    prev.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );

  return isNextDay;
};

const shouldShowAvatar = (
  prev: IMessage | undefined,
  message: IMessage
): boolean => {
  if (prev === undefined) return true;

  const isDifferentUser = message.user.id !== prev.user.id;
  if (isDifferentUser) return true;

  const isBeenAWhile = message.createdAt.seconds - prev.createdAt.seconds > 180;
  if (isBeenAWhile) return true;

  return false;
};

const useSmartScroll = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const node = ref.current;
    if (node === null) return;
    node.scrollTop = node.scrollHeight;
  });
};

const Messages: React.FunctionComponent<MessagesProps> = ({ channelId }) => {
  const messages: IMessage[] = useCollection(
    `channels/${channelId}/messages`,
    "createdAt"
  );
  const scrollerRef = useRef<HTMLDivElement>(null);
  useSmartScroll(scrollerRef);

  return (
    <div ref={scrollerRef} className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const prev = messages[index - 1];
        const showDay = shouldShowDate(prev, message);
        const showAvatar = shouldShowAvatar(prev, message);

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
