"use client";

import clsx from "clsx";
import { Check, CheckCheck } from "lucide-react";

export default function MessageBubble({

  message,

  ownMessage,

}) {

  return (

    <div
      className={clsx(

        "flex",

        ownMessage
          ? "justify-end"
          : "justify-start"

      )}
    >

      <div
        className={clsx(

          "max-w-[70%] rounded-3xl px-5 py-3 shadow-sm transition-all",

          ownMessage

            ? "bg-blue-500 text-white rounded-br-md"

            : "bg-white border border-slate-200 text-slate-700 rounded-bl-md"

        )}
      >

        <p className="leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>

        <div
  className={clsx(

    "mt-2 flex items-center justify-end gap-2 text-xs",

    ownMessage
      ? "text-blue-100"
      : "text-slate-400"

  )}
>

  <span>

    {new Date(
      message.createdAt
    ).toLocaleTimeString([], {

      hour: "2-digit",

      minute: "2-digit"

    })}

  </span>

  {ownMessage && (

    <span>

      {message.isRead
        ? "✓✓ Seen"
        : "✓ Sent"}

    </span>

  )}

</div>

      </div>

    </div>

  );

}