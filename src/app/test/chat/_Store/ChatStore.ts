"use client";

import { Post } from "@type/Type";
import { User } from "@type/Type";
import { create } from "zustand";
import { socket } from "../socket";
import { ChatRoom } from "@type/Type";

type ChatRoomClient = {
  room: ChatRoom;
  isNewMessage: boolean;
};

export const ChatStore = create<{
  user?: User;
  setUser: () => Promise<void>;
  login: (id: string, password: string) => Promise<void>;
  register: (
    id: string,
    password: string,
    email: string,
    phone: string
  ) => Promise<void>;
  logOut: () => Promise<void>;
  post: Post[];
  setPost: () => Promise<void>;
  uploadPost: (title: string) => Promise<void>;
  chatRoom: { chatAsUser: ChatRoomClient[]; chatAsHost: ChatRoomClient[] };
  roomNewMessage: (room_id: string) => void;
}>()((set, get) => ({
  user: undefined,
  setUser: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) return;
    const data = await res.json();
    set({ user: data });

    if (socket.connected) socket.disconnect();
    socket.connect();
    socket.emit(
      "login",
      (rooms: { roomsAsGuest: ChatRoom[]; roomsAsHost: ChatRoom[] }) => {
        console.log("socket login result rooms=", rooms);
        set({
          chatRoom: {
            chatAsUser: rooms.roomsAsGuest.map((room) => ({
              room: room,
              isNewMessage: false,
            })),
            chatAsHost: rooms.roomsAsHost.map((room) => ({
              room,
              isNewMessage: false,
            })),
          },
        });
      }
    );
  },
  login: async (id: string, password: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          id,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log("res.ok(): ", res.ok);
    if (!res.ok) return;
    await get().setUser();
  },
  register: async (
    user_id: string,
    password: string,
    email: string,
    phone: string
  ) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
      method: "POST",
      body: JSON.stringify({
        user_id,
        password,
        username: "username",
        phone,
        email,
        student_id: 1234,
        school: "asdf",
        gender: "male",
        birth: "1999-01-01",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("res.ok(): ", res.ok);
    if (!res.ok) return;
    const data = await res.json();
    console.log("data:", data);
  },
  logOut: async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    console.log("res.ok(): ", res.ok);
    if (!res.ok) return;
    set({ user: undefined, chatRoom: { chatAsUser: [], chatAsHost: [] } });
    socket.disconnect();
  },
  post: [],
  setPost: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
      method: "GET",
      credentials: "include",
    });
    console.log("setPost res.ok(): ", res.ok);
    if (!res.ok) return;
    const data = await res.json();
    console.log("setPost data:", data);
    set({ post: data });
  },
  uploadPost: async (title: string) => {
    const roomResp = await fetch(
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNF9waG90b19vZl9hX2ZyYW1lX2luX3RoZV9saXZpbmdfcm9vbV9pbl90aGVfc3R5bF85YWM1MjY1ZS02OTdjLTQ4OWMtYTFmYS03NzgzMjJlMTEwODNfMi5qcGc.jpg",
      {
        method: "GET",
      }
    );
    const roomBlobq = await roomResp.blob();

    const formData = new FormData();
    formData.append("images", roomBlobq);

    const roomInfo = {
      title,
      content: "content",
      price: "1000",
      category: "category",
      basic_info: "basic_info",
      benefit: "benefit",
      description: "description",
      end_day: new Date().toISOString(),
      extra_info: "extra_info",
      max_duration: "2",
      min_duration: "1",
      position: "position",
      refund_policy: "refund_policy",
      rule: "rule",
      start_day: new Date().toISOString(),
      limit_people: "2",
      number_room: "2",
      number_bathroom: "2",
      number_bedroom: "2",
      accomodation_type: "accom",
      building_type: "apart",
      x_coordinate: "13.42",
      y_coordinate: "13.42",
      city: "city",
      gu: "gu",
      dong: "dong",
      street: "street",
      street_number: "street_number",
      post_code: "post_code",
      contract: "true",
      local_save: "false",
    };

    for (const [key, value] of Object.entries(roomInfo)) {
      formData.append(key, value);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    console.log("uploadPost res.ok(): ", res.ok);
    if (!res.ok) return;
    const data = await res.json();
    console.log("uploadPost data:", data);
    await get().setPost();
  },
  chatRoom: { chatAsUser: [], chatAsHost: [] },
  roomNewMessage: (room_id: string) => {
    const chatRoom = get().chatRoom;

    set({
      chatRoom: {
        chatAsUser: chatRoom.chatAsUser.map((ele) => {
          if (ele.room.id === room_id) {
            ele.isNewMessage = true;
          }
          return ele;
        }),
        chatAsHost: chatRoom.chatAsHost.map((ele) => {
          if (ele.room.id === room_id) {
            ele.isNewMessage = true;
          }
          return ele;
        }),
      },
    });
  },
}));
