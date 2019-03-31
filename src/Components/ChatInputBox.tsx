import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { IMessage, IUser } from "../types";

type Props = {
  user: IUser;
};

const ChatInputBox: React.FunctionComponent<Props> = ({ user }) => {
  const [message, setMessage] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    setMessage(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!message) return;
    const newMessage: IMessage = {
      text: message,
      createdAt: new Date(),
      user: db.collection("users").doc(user.uid)
    };
    db.collection("channels/general/messages").add(newMessage);

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
