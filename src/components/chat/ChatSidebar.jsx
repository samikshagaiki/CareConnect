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
      h-full
      flex
      flex-col
      border-r
      border-slate-200
      bg-slate-50
    "
  >
    {/* Header */}

    <div className="border-b border-slate-200 bg-white p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
        Chats
      </h2>

      <p className="mt-1 text-xs sm:text-sm text-slate-500">
        {role === "patient"
          ? "Talk to your counselor"
          : "Communicate with your patients"}
      </p>

      <div className="relative mt-4">
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
            text-sm
            outline-none
            transition
            focus:border-blue-400
            focus:bg-white
          "
        />
      </div>
    </div>

    {/* Conversations */}

    <div className="flex-1 overflow-y-auto">
      {filtered.length === 0 ? (
        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-500">
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
                p-3
                sm:p-4
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
              <div className="flex gap-3">
                {/* Avatar */}

                <div className="relative shrink-0">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      sm:h-12
                      sm:w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-100
                      font-semibold
                      text-blue-700
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

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm sm:text-base font-semibold">
                      {person.fullName ||
                        person.anonymousName}
                    </h3>

                    {(unreadCounts[
                      conversation._id
                    ] || 0) > 0 && (
                      <span
                        className="
                          shrink-0
                          rounded-full
                          bg-blue-600
                          px-2
                          py-1
                          text-[10px]
                          font-semibold
                          text-white
                        "
                      >
                        {
                          unreadCounts[
                            conversation._id
                          ]
                        }
                      </span>
                    )}
                  </div>

                  <p className="mt-1 truncate text-xs sm:text-sm text-slate-500">
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