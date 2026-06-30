"use client";

import {
  useEffect,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getSocket } from "@/lib/socket/socket";

import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";
import EmptyState from "./EmptyState";

export default function ChatLayout({ role, userId }) {
  const [showSidebar, setShowSidebar] = useState(role === "counselor");

  const [conversations, setConversations] = useState([]);

  const [selectedConversation, setSelectedConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [search, setSearch] = useState("");

  const [unreadCounts, setUnreadCounts] = useState({});

  const [connected, setConnected] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [typing, setTyping] = useState(false);

  const socket = useMemo(() => getSocket(), []);

  const searchParams =
  useSearchParams();

const counselorId =
  searchParams.get("counselor");

const patientId =
  searchParams.get("patient");

  //---------------------------------------
  // Load Conversations
  //---------------------------------------

  async function loadConversations() {
  const response =
    await fetch(
      "/api/chat/conversations"
    );

  const data =
    await response.json();

  if (!data.success) return;

  setConversations(
    data.conversations
  );

  let conversationToOpen =
    null;

  if (
    role === "patient" &&
    counselorId
  ) {
    conversationToOpen =
      data.conversations.find(
        (conversation) =>
          conversation
            .counselor
            ?.userId ===
          counselorId
      );
  }

  if (
    role === "counselor" &&
    patientId
  ) {
    conversationToOpen =
      data.conversations.find(
        (conversation) =>
          conversation.patient
            ?.userId ===
          patientId
      );
  }

  if (
    conversationToOpen
  ) {
    selectConversation(
      conversationToOpen
    );
  } else if (
    data.conversations.length >
      0 &&
    !selectedConversation
  ) {
    selectConversation(
      data.conversations[0]
    );
  }
}

  //---------------------------------------
  // Load Messages
  //---------------------------------------

  async function loadMessages(conversationId) {
    const response = await fetch(`/api/chat/messages/${conversationId}`);

    const data = await response.json();

    if (data.success) {
      setMessages(data.messages);
    }
  }

  //---------------------------------------
  // Select Conversation
  //---------------------------------------

  function selectConversation(conversation) {

  setSelectedConversation(conversation);

  setUnreadCounts((previous) => ({

    ...previous,

    [conversation._id]: 0,

  }));

  loadMessages(conversation._id);

   if (
    window.innerWidth < 768
  ) {

    setShowSidebar(false);

  }

}

  //---------------------------------------
  // Socket
  //---------------------------------------

  useEffect(() => {
    setConnected(socket.connected);

    socket.emit("join", userId);

    socket.on("receive-message", (message) => {

  if (
    message.conversationId ===
    selectedConversation?._id
  ) {

    setMessages((previous) => {

      if (
        previous.some(
          (m) => m._id === message._id
        )
      ) {
        return previous;
      }

      return [...previous, message];

    });

  } else {

    setUnreadCounts((previous) => ({

      ...previous,

      [message.conversationId]:
        (previous[message.conversationId] || 0) + 1,

    }));

  }

});

    socket.on(
  "message-read",
  ({ conversationId }) => {

    if (
      conversationId !==
      selectedConversation?._id
    ) {
      return;
    }

    setMessages((previous) =>
      previous.map((message) => ({
        ...message,
        isRead: true,
      }))
    );

  }
);

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", ({ senderId }) => {

  const otherUser =
    selectedConversation?.patient?.userId === userId
      ? selectedConversation?.counselor?.userId
      : selectedConversation?.patient?.userId;

  if (senderId === otherUser) {
    setTyping(true);
  }

});

socket.on("stop-typing", ({ senderId }) => {

  const otherUser =
    selectedConversation?.patient?.userId === userId
      ? selectedConversation?.counselor?.userId
      : selectedConversation?.patient?.userId;

  if (senderId === otherUser) {
    setTyping(false);
  }

});

    socket.on("connect", () => {

    console.log("CONNECTED");

    setConnected(true);

});

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("conversation-updated", (conversation) => {
      setConversations((previous) => {
        const updated = [...previous];

        const index = updated.findIndex(
          (c) => c._id === conversation.conversationId,
        );

        if (index === -1) return previous;

        updated[index].lastMessage = conversation.lastMessage;

        updated[index].updatedAt = conversation.createdAt;

        updated.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        return updated;
      });
    });

    return () => {
      socket.off("receive-message");

      socket.off("typing");

      socket.off("stop-typing");

      socket.off("online-users");

      socket.off("connect");

      socket.off("disconnect");

      socket.off("conversation-updated");

      socket.off("message-read");

    };
  }, [userId, selectedConversation]);


  useEffect(() => {

  if (!selectedConversation) return;

  async function markAsRead() {

    await fetch(
      "/api/chat/read",
      {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          conversationId:
            selectedConversation._id,

        }),
      }
    );

    const otherUserId =
      selectedConversation.patient?.userId === userId
        ? selectedConversation.counselor?.userId
        : selectedConversation.patient?.userId;

    socket.emit(
      "read-message",
      {
        conversationId:
          selectedConversation._id,

        senderId:
          otherUserId,

        readerId:
          userId,
      }
    );

    socket.emit("notification-read", {
  userId,
});

  }

  markAsRead();

}, [
  selectedConversation,
  userId,
]);

function openSidebar() {

  setShowSidebar(true);

}

  //---------------------------------------

 useEffect(() => {
  loadConversations();
}, [
  counselorId,
  patientId,
]);
  //---------------------------------------

return (

<div
className="
flex
h-[calc(100vh-90px)]
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
"
>

{/* Sidebar */}

<div
className={`
border-r
border-slate-200
bg-white

${
role==="patient"

? "hidden md:block w-[320px]"

: showSidebar

? "block w-full md:w-[320px]"

: "hidden md:block md:w-[320px]"
}
`}
>

<ChatSidebar

role={role}

conversations={conversations}

selectedConversation={selectedConversation}

onSelect={selectConversation}

unreadCounts={unreadCounts}

search={search}

setSearch={setSearch}

onlineUsers={onlineUsers}

/>

</div>

{/* Chat */}

<div
className={`
flex
flex-1
flex-col
min-w-0

${
role==="counselor"

&&

showSidebar

? "hidden md:flex"

: "flex"
}
`}
>

{selectedConversation ? (

<>

<ChatHeader

conversation={selectedConversation}

onlineUsers={onlineUsers}

typing={typing}

connected={connected}

userId={userId}

role={role}

showBackButton={
role==="counselor"
}

onBack={openSidebar}

/>

<div
className="
flex-1
min-h-0
overflow-hidden
"
>

<ChatMessages

messages={messages}

userId={userId}

/>

</div>

<div
className="
shrink-0
border-t
bg-white
"
>

<MessageInput

conversation={selectedConversation}

userId={userId}

socket={socket}

setMessages={setMessages}

/>

</div>

</>

) : (

<EmptyState/>

)}

</div>

</div>

);
}
