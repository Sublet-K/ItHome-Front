"use client";

import { useEffect, useRef } from "react";
import { ChatStore } from "./_Store/ChatStore";
import { socket } from "./socket";
import Link from "next/link";

export default function Chat() {
  const state = ChatStore();

  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(socket.id);
  }, [state]);

  useEffect(() => {
    state.setPost();
    state.setUser();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          state.register(
            "asdf",
            "Asdf!asdf1",
            "asdf@gmail.com",
            "+8210-1234-5678"
          );
        }}
      >
        Register asdf
      </button>
      <button
        onClick={() => {
          state.register(
            "asdf2",
            "Asdf!asdf2",
            "asdf2@gmail.com",
            "+8210-1234-5679"
          );
        }}
      >
        Register asdf2
      </button>
      <button
        onClick={() => {
          state.register(
            "asdf3",
            "Asdf!asdf3",
            "asdf3@gmail.com",
            "+8210-1234-5670"
          );
        }}
      >
        Register asdf2
      </button>
      <br />
      <button
        onClick={() => {
          state.login("asdf", "Asdf!asdf1");
        }}
      >
        Login asdf 1
      </button>
      <button
        onClick={() => {
          state.login("asdf2", "Asdf!asdf2");
        }}
      >
        Login asdf 2
      </button>
      <button
        onClick={() => {
          state.login("asdf3", "Asdf!asdf3");
        }}
      >
        Login asdf 3
      </button>
      <br />
      <button
        onClick={() => {
          state.logOut();
        }}
      >
        Logout
      </button>
      <br />
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        I am: {state.user ? state.user.user_id : "undefined"}
      </div>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <h3>ChatRoom List, len={state.chatRoom.chatAsUser.length}</h3>
        <ul>
          {state.chatRoom.chatAsUser.map((chatroom, idx) => {
            return (
              <li key={idx}>
                <Link href={`/test/chat/${chatroom}`}>
                  Go to chatroom: {chatroom}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <h3>ChatRoom As Host List, len={state.chatRoom.chatAsHost.length}</h3>
        <ul>
          {state.chatRoom.chatAsHost.map((chatroom, idx) => {
            return (
              <li key={idx}>
                <Link href={`/test/chat/${chatroom}`}>
                  Go to chatroom: {chatroom}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>Posts, len={state.post.length}</h3>
        <ul>
          {state.post.map((post, idx) => {
            return (
              <li key={idx}>
                {post.title} / {post.postuser.user_id}
                <button
                  onClick={() => {
                    socket.emit("join_chatroom", post.key, () => {
                      console.log("join chatroom good");
                    });
                  }}
                >
                  Make chatRoom!
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {state.user && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("submitted!");
            console.log("title=", titleRef.current?.value);
            if (titleRef.current?.value)
              state.uploadPost(titleRef.current?.value);
          }}
        >
          <input type="text" ref={titleRef}></input>
          <button type="submit">Submit</button>
        </form>
      )}
      We are in Chatpage!
    </div>
  );
}
