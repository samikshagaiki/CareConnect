import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Notification from "@/models/Notification";

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

    const { type } =
      await request.json();

    await Notification.updateMany(
      {
        userId: session.user.id,
        type,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      }
    );

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