import React, { useRef, useEffect } from "react";
import useCollection from "../Hooks/useCollecton";
import useDocWithCache from "../Hooks/useDocWithCache";
import { TMessage, TUser } from "../types";
import format from "date-fns/format";
import isSameDay from "date-fns/is_same_day";

type IMessageWithAvatarProps = {
  message: TMessage;
  showDay: boolean;
};

const MessageWithAvatar: React.FunctionComponent<IMessageWithAvatarProps> = ({
  message,
  showDay
}) => {
  const author = useDocWithCache<TUser>(message.user.path);

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
  prev: TMessage | undefined,
  message: TMessage
): boolean => {
  if (prev === undefined) return true;

  const isNextDay = !isSameDay(
    prev.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );

  return isNextDay;
};

const shouldShowAvatar = (
  prev: TMessage | undefined,
  message: TMessage
): boolean => {
  if (prev === undefined) return true;

  const isDifferentUser = message.user.id !== prev.user.id;
  if (isDifferentUser) return true;

  const isBeenAWhile = message.createdAt.seconds - prev.createdAt.seconds > 180;
  if (isBeenAWhile) return true;

  return false;
};

const ChatScroller: React.FunctionComponent<any> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = ref.current;
      if (node === null) return;
      node.scrollTop = node.scrollHeight;
    }
  });

  const handleScroll = () => {
    const node = ref.current;
    if (node === null) return;
    const { scrollTop, scrollHeight, clientHeight } = node;
    const atBottom = scrollHeight === clientHeight + scrollTop;
    shouldScrollRef.current = atBottom;
  };

  return <div {...props} ref={ref} onScroll={handleScroll} />;
};

const Messages: React.FunctionComponent<MessagesProps> = ({ channelId }) => {
  const messages: TMessage[] = useCollection(
    `channels/${channelId}/messages`,
    "createdAt"
  );

  return (
    <ChatScroller className="Messages">
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
            </div>{" "}
          </div>
        );
      })}
    </ChatScroller>
  );
};

export default Messages;
