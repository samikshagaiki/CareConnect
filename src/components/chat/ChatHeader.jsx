"use client";

import {

Phone,

Video,

MoreVertical,

ArrowLeft,

} from "lucide-react";

export default function ChatHeader({
  conversation,
  onlineUsers,
  typing,
  connected,
  userId,
  role,
  showBackButton,
  onBack,
}) {
  const person =
    conversation.patient?.userId?.toString() === userId?.toString()
      ? conversation.counselor
      : conversation.patient;

  const isOnline = onlineUsers.includes(person?.userId?.toString());

  return (
    <div
      className="
      flex
      items-center
      justify-between
      border-b
      border-slate-200
      bg-white
      px-6
      py-4
    "
    >
      <div className="flex items-center gap-4">

{showBackButton && (

<button

onClick={onBack}

className="
mr-1
rounded-xl
p-2
hover:bg-slate-100
md:hidden
"

>

<ArrowLeft size={20}/>

</button>

)}
        <div
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-blue-100
          text-lg
          font-semibold
          text-blue-700
        "
        >
          {(person.fullName || person.anonymousName)?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <h2 className="font-semibold text-slate-800">
            {person.fullName || person.anonymousName}
          </h2>

          {typing ? (
            <p className="text-sm font-medium text-green-600 animate-pulse">
              <span className="flex items-center gap-2">

  <span className="flex gap-1">

    <span className="h-2 w-2 rounded-full bg-green-500 animate-bounce"></span>

    <span
      className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
      style={{ animationDelay: "0.2s" }}
    ></span>

    <span
      className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
      style={{ animationDelay: "0.4s" }}
    ></span>

  </span>

  Typing...

</span>
            </p>
          ) : !connected ? (

  <div className="flex items-center gap-2">

    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>

    <p className="text-sm text-amber-600">

      Connecting...

    </p>

  </div>

) : (
            <p className="text-sm text-slate-500">
              <div className="flex items-center gap-2">

  <span
    className={`

      h-2.5
      w-2.5
      rounded-full

      ${
        isOnline
          ? "bg-green-500"
          : "bg-slate-400"
      }

    `}
  />

  <span>

    {isOnline
      ? "Online"
      : "Offline"}

  </span>

</div>
            </p>
          )}
        </div>
      </div>

      {/* <div className="flex gap-3">
        <button
          className="
          rounded-xl
          p-2
          hover:bg-slate-100
        "
        >
          <Phone size={18} />
        </button>

        <button
          className="
          rounded-xl
          p-2
          hover:bg-slate-100
        "
        >
          <Video size={18} />
        </button>

        <button
          className="
          rounded-xl
          p-2
          hover:bg-slate-100
        "
        >
          <MoreVertical size={18} />
        </button>
      </div> */}
    </div>
  );
}
