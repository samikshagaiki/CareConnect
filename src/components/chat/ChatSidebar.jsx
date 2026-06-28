"use client";

import { Search } from "lucide-react";

export default function ChatSidebar({

  conversations,

  selectedConversation,

  onSelect,

  role,

  unreadCounts,

  search,

  setSearch,

  onlineUsers,

}) {
  const filtered = conversations.filter((conversation) => {
    const person =
      role === "patient"
        ? conversation.counselor
        : conversation.patient;

    return (
      (person?.fullName || person?.anonymousName || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div
      className="
      col-span-4
      border-r
      border-slate-200
      bg-slate-50
      flex
      flex-col
    "
    >
      {/* Header */}

      <div className="border-b border-slate-200 bg-white p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Chats
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {role === "patient"
            ? "Talk to your counselor"
            : "Communicate with your patients"}
        </p>

        <div className="relative mt-5">

          <Search
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
          />

          <input
  type="text"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  placeholder="Search..."
  className="
  w-full
  rounded-2xl
  border
  border-slate-200
  bg-slate-50
  py-3
  pl-11
  pr-4
  outline-none
  focus:border-blue-400
  focus:bg-white
"
/>

        </div>

      </div>

      {/* Conversations */}

      <div className="flex-1 overflow-y-auto">

        {filtered.length === 0 ? (

          <div className="flex h-full items-center justify-center text-slate-500">
            No conversations found.
          </div>

        ) : (

          filtered.map((conversation) => {

            const person =
              role === "patient"
                ? conversation.counselor
                : conversation.patient;

            const online =
              onlineUsers.includes(
                person.userId
              );

            return (

              <button
                key={conversation._id}
                onClick={() =>
                  onSelect(conversation)
                }
                className={`
                  w-full
                  border-b
                  border-slate-100
                  p-5
                  text-left
                  transition
                  hover:bg-white

                  ${
                    selectedConversation?._id ===
                    conversation._id
                      ? "bg-white"
                      : ""
                  }
                `}
              >

                <div className="flex gap-4">

                  {/* Avatar */}

                  <div className="relative">

                    <div
                      className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-100
                      text-blue-700
                      font-semibold
                    "
                    >
                      {(person.fullName ||
                        person.anonymousName)
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    {online && (

                      <span
                        className="
                        absolute
                        bottom-0
                        right-0
                        h-3
                        w-3
                        rounded-full
                        border-2
                        border-white
                        bg-green-500
                      "
                      />

                    )}

                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between">

                      <h3 className="truncate font-semibold">

                        {person.fullName ||
                          person.anonymousName}

                      </h3>

                      {(unreadCounts[conversation._id] || 0) > 0 &&  (

                        <span
                          className="
                          rounded-full
                          bg-blue-600
                          px-2
                          py-1
                          text-[10px]
                          text-white
                        "
                        >
                          {unreadCounts[
                            conversation._id
                          ] ||
                            unreadCounts[conversation._id]}
                        </span>

                      )}

                    </div>

                    <p className="mt-1 truncate text-sm text-slate-500">

                      {conversation.lastMessage ||
                        "Start chatting..."}

                    </p>

                  </div>

                </div>

              </button>

            );

          })

        )}

      </div>

    </div>
  );
}