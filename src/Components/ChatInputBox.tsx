import React, { useState } from "react";
import { db } from "../firebase/firebase";

interface IMessage {
  text: string;
  createdAt: Date;
}

const ChatInputBox: React.FunctionComponent = React.memo(props => {
  const [message, setMessage] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    setMessage(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newMessage: IMessage = {
      text: message,
      createdAt: new Date()
    };
    db.collection("channels/general/messages")
      .add(newMessage)
      .then((): void => setMessage(""));
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
});

export default ChatInputBox;
