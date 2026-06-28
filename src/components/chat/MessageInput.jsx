"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({
  conversation,
  userId,
  socket,
  setMessages,
}) {
  const [message, setMessage] =
    useState("");

 const typingTimeout = useRef(null);

  //-----------------------------------------
  // Receiver
  //-----------------------------------------

 const receiverId =
  conversation.patient?.userId?.toString() ===
  userId.toString()
    ? conversation.counselor?.userId
    : conversation.patient?.userId;

if (!receiverId) {
  return null;
}

  //-----------------------------------------
  // Typing
  //-----------------------------------------

  function handleTyping(value) {

  setMessage(value);

  socket.emit("typing", {
    senderId: userId,
    receiverId,
  });

  if (typingTimeout.current) {
    clearTimeout(typingTimeout.current);
  }

  typingTimeout.current = setTimeout(() => {

    socket.emit("stop-typing", {
      senderId: userId,
      receiverId,
    });

  }, 2000);

}

  //-----------------------------------------
  // Send
  //-----------------------------------------

  async function sendMessage() {

    if (!message.trim())
      return;

    const text =
      message.trim();

    setMessage("");

    const response =
      await fetch(
        "/api/chat/send",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            receiverId,
            text,
          }),
        }
      );

    const data =
      await response.json();

    if (!data.success)
      return;

    setMessages(
      (previous) => [
        ...previous,
        data.message,
      ]
    );

    socket.emit(
      "send-message",
      data.message
    );

    socket.emit(
      "stop-typing",
      {
        senderId: userId,
        receiverId,
      }
    );
  }

  //-----------------------------------------

  function handleKeyDown(e) {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      sendMessage();
    }
  }

  //-----------------------------------------

  useEffect(() => {

    return () => {

      clearTimeout(
        typingTimeout.current
      );

    };

  }, []);

  //-----------------------------------------

  return (

    <div
      className="
      border-t
      border-slate-200
      bg-white
      p-5
    "
    >

      <div className="flex items-end gap-4">

        <textarea

          rows={1}

          value={message}

          onChange={(e)=>
            handleTyping(
              e.target.value
            )
          }

          onKeyDown={
            handleKeyDown
          }

          placeholder="Type your message..."

          className="
          max-h-40
          min-h-[52px]
          flex-1
          resize-none
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          px-5
          py-3
          outline-none
          transition
          focus:border-blue-400
          focus:bg-white
        "

        />

        <button

          onClick={
            sendMessage
          }

          disabled={
            !message.trim()
          }

          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-blue-600
          text-white
          transition
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-40
        "

        >

          <Send size={18}/>

        </button>

      </div>

    </div>

  );

}