import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Conversation from "@/models/Conversation";
import Message from "@/models/Message";

import { createNotification } from "@/lib/createNotification";

export async function POST(request) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const {
      receiverId,
      text,
    } = await request.json();

    if (!receiverId || !text.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid data",
        },
        {
          status: 400,
        }
      );
    }

    let patientId;
    let counselorId;

    if (
      session.user.role ===
      "patient"
    ) {
      patientId =
        session.user.id;

      counselorId =
        receiverId;
    } else {
      counselorId =
        session.user.id;

      patientId =
        receiverId;
    }

    // Find conversation

    let conversation =
      await Conversation.findOne({
        patientId,
        counselorId,
      });

    // Create conversation if not exists

    if (!conversation) {
      conversation =
        await Conversation.create({
          patientId,
          counselorId,
        });
    }

    // Save message

    const message =
      await Message.create({
        conversationId:
          conversation._id,

        senderId:
          session.user.id,

        receiverId,

        text,
      });

      await createNotification({
  userId: receiverId,

  type: "chat",

  title: "New Message",

  message:
    session.user.role === "patient"
      ? "Your counselor sent you a message."
      : "A patient sent you a message.",

  referenceId:
    conversation._id.toString(),
});

    // Update conversation

    conversation.lastMessage =
      text;

    conversation.lastSender =
      session.user.id;

    conversation.lastMessageAt =
      new Date();

    await conversation.save();

    return NextResponse.json({
      success: true,
      message,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}