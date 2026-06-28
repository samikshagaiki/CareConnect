import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Conversation from "@/models/Conversation";

export async function POST(request) {
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
      receiverId,
    } = await request.json();

    let patientId;
    let counselorId;

    if (session.user.role === "patient") {

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

    let conversation =
      await Conversation.findOne({

        patientId,

        counselorId,

      });

    if (!conversation) {

      conversation =
        await Conversation.create({

          patientId,

          counselorId,

        });

    }

    return NextResponse.json({

      success: true,

      conversation,

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