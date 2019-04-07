import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { TMessage, TUser } from "../types";
import { firestore } from "firebase";

type Props = {
  channelId: string;
  user: TUser;
};

const ChatInputBox: React.FunctionComponent<Props> = ({ user, channelId }) => {
  const [message, setMessage] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    setMessage(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!message) return;
    const newMessage: TMessage = {
      text: message,
      createdAt: firestore.Timestamp.fromDate(new Date()),
      user: db.collection("users").doc(user.uid)
    };
    db.collection(`channels/${channelId}/messages`).add(newMessage);

    setMessage("");
  };

  return (
    <form onSubmit={onSubmit} className="ChatInputBox">
      <input
        onChange={onChange}
        value={message}
        className="ChatInput"
        placeholder="Message #general"
      />
    </form>
  );
};

export default ChatInputBox;
