"use client";

import { io } from "socket.io-client";

let socket;

export function getSocket() {

  if (!socket) {

    socket = io( process.env.NEXT_PUBLIC_SOCKET_URL, {

      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      reconnectionDelayMax: 10000,
      timeout: 5000,
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