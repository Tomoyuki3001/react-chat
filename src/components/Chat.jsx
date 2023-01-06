import { createContext, useEffect, useRef, useState } from "react";
import React from "react";
import Message from "./Message";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import SendMessage from "./SendMessage";
import ScrollToBottom from "react-scroll-to-bottom";
export const MessageContext = createContext();

const style = {
  main: "flex flex-col p-[10px] relative pb-20",
};

function Chat() {
  const [messages, setMessages] = useState([]);

  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <MessageContext.Provider value={{ messages, setMessages }}>
        <ScrollToBottom className="message-container">
          <main className={style.main}>
            {messages &&
              messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
          </main>
        </ScrollToBottom>
        <SendMessage scroll={scroll} />
        <span ref={scroll}></span>
      </MessageContext.Provider>
    </>
  );
}

export default Chat;
