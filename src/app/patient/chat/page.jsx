"use client";

import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import ChatLayout from "@/components/chat/ChatLayout";

function PatientChatContent() {
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();

  const counselorId = searchParams.get("counselor");

  const [loadingConversation, setLoadingConversation] =
    useState(false);

  useEffect(() => {
    async function startConversation() {
      if (!session || !counselorId) return;

      try {
        setLoadingConversation(true);

        await fetch("/api/chat/start", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiverId: counselorId,
          }),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingConversation(false);
      }
    }

    startConversation();
  }, [session, counselorId]);

  if (status === "loading" || loadingConversation) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        Loading chat...
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
        role="patient"
        userId={session.user.id}
      />
    </div>
  );
}

export default function PatientChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[80vh] items-center justify-center">
          Loading chat...
        </div>
      }
    >
      <PatientChatContent />
    </Suspense>
  );
}