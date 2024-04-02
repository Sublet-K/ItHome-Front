"use client";

import { io } from "socket.io-client";
export let socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
  withCredentials: true,
});
