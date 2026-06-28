"use client";

import { useSession } from "next-auth/react";
import ChatLayout from "@/components/chat/ChatLayout";

export default function CounselorChatPage() {

  const { data: session, status } =
    useSession();

  if (status === "loading") {

    return (
      <div className="flex h-[80vh] items-center justify-center">
        Loading...
      </div>
    );

  }

  if (!session) {

    return (
      <div className="flex h-[80vh] items-center justify-center">
        Please login.
      </div>
    );

  }

  return (

    <div className="mx-auto max-w-7xl py-6">

      <ChatLayout
        role="counselor"
        userId={session.user.id}
      />

    </div>

  );

}