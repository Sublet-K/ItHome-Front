"use client";

import { ChatLog } from "@type/Type";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";

export default function ChatRoom({ params }: { params: { chat_id: string } }) {
  const [chatlog, setChatlog] = useState<ChatLog[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("hello!");
    socket.emit("login", () => {
      console.log("logined!");
    });
    console.log("login after,");

    socket.emit(
      "get_chatlog",
      { room_id: params.chat_id },
      (logs: ChatLog[]) => {
        setChatlog(logs);
      }
    );

    function receiveMessageHandler(chatlog: ChatLog) {
      console.log("received message!", chatlog);
      setChatlog((prev) => [...prev, chatlog]);
    }

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, []);

  return (
    <div>
      ChatRoom: {params.chat_id}
      <ul>
        {chatlog.map((log, idx) => (
          <li key={idx}>
            {log.user.user_id}: {log.message}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          console.log("asdf");
          e.preventDefault();
          if (!inputRef.current) return;
          const msg = inputRef.current.value;
          inputRef.current.value = "";
          if (!msg || msg === "") return;
          socket.emit(
            "send_message",
            { message: msg, room_id: params.chat_id },
            () => {
              console.log("message send successful");
            }
          );
        }}
      >
        <input type="text" ref={inputRef}></input>
        <button type="submit"> Enter! </button>
      </form>
    </div>
  );
}
