"use client";

import { useEffect } from "react";

import { getSocket } from "@/lib/socket/socket";

export default function useSocket(userId) {

  useEffect(() => {

    if (!userId) return;

    const socket =
      getSocket();

    socket.emit(
      "join",
      userId
    );

    return () => {

      socket.disconnect();

    };

  }, [userId]);

}