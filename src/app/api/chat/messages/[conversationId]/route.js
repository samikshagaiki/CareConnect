import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Message from "@/models/Message";
import Conversation from "@/models/Conversation";

export async function GET(
  request,
  { params }
) {
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

    const { conversationId } =
      await params;

    // Verify conversation exists

    const conversation =
      await Conversation.findById(
        conversationId
      );

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Conversation not found",
        },
        {
          status: 404,
        }
      );
    }

    // Security check

    const isParticipant =
      conversation.patientId.toString() ===
        session.user.id ||
      conversation.counselorId.toString() ===
        session.user.id;

    if (!isParticipant) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    const messages =
      await Message.find({
        conversationId,
      })
        .sort({
          createdAt: 1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      messages,
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