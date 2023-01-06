import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase";

const style = {
  form: "h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0",
  input: "w-full text-xl p-3 bg-gray-900 text-white outline-none border-none",
  button: "w-[20%] bg-green-500",
};

const SendMessage = ({ scroll }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please type messages");
      return;
    }
    const { uid, displayName } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: input,
      name: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
    scroll.current.scrollIntoView({ behavior: "smooth" });
    setInput("");
  };

  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type="text"
        placeholder="Message..."
      />
      <button className={style.button} type="submit">
        &#9658;
      </button>
    </form>
  );
};

export default SendMessage;
