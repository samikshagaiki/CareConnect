import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Conversation from "@/models/Conversation";
import Message from "@/models/Message";

export async function PATCH(request) {
  try {
    const session =
      await getServerSession(authOptions);

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
      conversationId,
    } = await request.json();

    const conversation =
      await Conversation.findById(
        conversationId
      );

    if (!conversation) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    // Mark all unread messages
    // sent to this user as read

    await Message.updateMany(
      {
        conversationId,

        receiverId:
          session.user.id,

        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

    await conversation.save();

    return NextResponse.json({
      success: true,
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