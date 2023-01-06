import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { MessageContext } from "./Chat";

const style = {
  message:
    "shadow-xl mt-4 mb-4 py-2 px-3 rounded-tl-full rounded-tr-full max-w-lg",
  name: "absolute text-gray-600 text-xs",
  textSent:
    "bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full",
  textReceived: "bg-[#e5e5ea] text-black float-left rounded-br-full",
  nameSent: "flex-row-reverse text-end float-right bottom-0 right-0",
  nameReceived: "float-left bottom-0 left-0",
};

const Message = ({ message }) => {
  const { time } = useContext(MessageContext);
  // const [time, setTime] = useState(message.timestamp.seconds);
  // console.log("time", time);
  const messageClass =
    message.uid === auth.currentUser.uid
      ? `${style.textSent}`
      : `${style.textReceived}`;
  const textClass =
    message.uid === auth.currentUser.uid
      ? `${style.nameSent}`
      : `${style.nameReceived}`;

  return (
    <div className="message-main-container">
      <div className={`${style.message} ${messageClass}`}>
        <p className="message-text">{message.text}</p>
      </div>
      <span className={`${style.name} ${textClass}`}>{message.name}</span>{" "}
    </div>
  );
};

export default Message;
