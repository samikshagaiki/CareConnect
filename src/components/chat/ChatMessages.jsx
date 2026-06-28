"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatMessages({
  messages,
  userId,
}) {

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior:

messages.length > 1

? "smooth"

: "auto"
    });

  }, [messages]);

  function getDateLabel(date) {

    const today = new Date();

    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    const current = new Date(date);

    if (
      current.toDateString() ===
      today.toDateString()
    ) {
      return "Today";
    }

    if (
      current.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return current.toLocaleDateString();
  }

  let previousDate = "";

  return (

    <div
      className="
      flex-1
      overflow-y-auto
      bg-slate-50
      px-8
      py-6
    "
    >

      {messages.map((message) => {

        const currentDate =
          getDateLabel(message.createdAt);

        const showDate =
          currentDate !== previousDate;

        previousDate = currentDate;

        return (

          <div key={message._id}>

            {showDate && (

              <div className="my-6 flex justify-center">

                <span
                  className="
                  rounded-full
                  bg-slate-200
                  px-4
                  py-1
                  text-xs
                  font-semibold
                  text-slate-600
                "
                >
                  {currentDate}
                </span>

              </div>

            )}

            <MessageBubble
              message={message}
              ownMessage={
                message.senderId === userId
              }
            />

          </div>

        );

      })}

      <div ref={bottomRef} />

    </div>

  );

}