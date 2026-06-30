import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Notification from "@/models/Notification";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

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

    const notifications =
      await Notification.aggregate([
        {
          $match: {
            userId: session.user.id,
            isRead: false,
          },
        },
        {
          $group: {
            _id: "$type",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    const counts = {
      chat: 0,
      appointment: 0,
      assessment: 0,
      community: 0,
      patient: 0,
      system: 0,
    };

    notifications.forEach((notification) => {
      counts[notification._id] =
        notification.count;
    });

    return NextResponse.json({
      success: true,
      counts,
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