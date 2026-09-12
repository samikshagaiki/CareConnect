"use client";

import { useEffect, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket/socket";

export default function useNotifications() {
  const [counts, setCounts] = useState({
    chat: 0,
    appointment: 0,
    assessment: 0,
    community: 0,
    patient: 0,
    system: 0,
  });

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/notifications/count");
      const data = await response.json();

      if (data.success && data.counts) {
        setCounts(data.counts);
      }
    } catch (error) {
      console.error("Failed to fetch notification counts:", error);
    }
  }, []);

  useEffect(() => {

    fetchNotifications();

    const socket =
      getSocket();

    socket.on(
      "notification",
      fetchNotifications
    );

    socket.on(
      "notification-read",
      fetchNotifications
    );

    return () => {

      socket.off(
        "notification",
        fetchNotifications
      );

      socket.off(
        "notification-read",
        fetchNotifications
      );

    };

  }, []);

  return {

    counts,

    refreshNotifications:
      fetchNotifications,

  };

}