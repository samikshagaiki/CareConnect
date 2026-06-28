"use client";

import { MessageCircle } from "lucide-react";

export default function EmptyState() {

  return (

    <div
      className="
      flex
      flex-1
      flex-col
      items-center
      justify-center
      bg-slate-50
      px-10
      text-center
    "
    >

      <div
        className="
        flex
        h-24
        w-24
        items-center
        justify-center
        rounded-full
        bg-blue-100
      "
      >
        <MessageCircle
 size={42}
 className="
 text-blue-600
 animate-pulse
"
/>
      </div>

      <h2
        className="
        mt-8
        text-3xl
        font-bold
        text-slate-800
      "
      >
        Select a Conversation
      </h2>

      <p
        className="
        mt-4
        max-w-md
        text-slate-500
      "
      >
        Choose a patient or counselor
        from the sidebar to start
        chatting in real time.
      </p>

    </div>

  );

}