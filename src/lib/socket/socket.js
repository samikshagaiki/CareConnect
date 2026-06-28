"use client";

import { io } from "socket.io-client";

let socket;

export function getSocket() {

  if (!socket) {

    socket = io("http://localhost:4000", {

      transports: ["websocket"],

      reconnection: true,

      reconnectionAttempts: Infinity,

    });

    socket.on("connect", () => {

      console.log("✅ Socket Connected:", socket.id);

    });

    socket.on("disconnect", () => {

      console.log("❌ Socket Disconnected");

    });

    socket.on("connect_error", (err) => {

      console.log("🚨 Connect Error:", err.message);

    });

  }

  return socket;

}