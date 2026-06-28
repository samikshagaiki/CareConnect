import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import Conversation from "@/models/Conversation";
import PatientProfile from "@/models/PatientProfile";
import CounselorProfile from "@/models/CounselorProfile";

export async function GET() {
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

    let conversations = [];

    //-------------------------------------------------
    // PATIENT
    //-------------------------------------------------

    if (
      session.user.role ===
      "patient"
    ) {

      const data =
        await Conversation.find({

          patientId:
            session.user.id,

        })
          .sort({
            lastMessageAt: -1,
          })
          .lean();

      conversations =
        await Promise.all(

          data.map(
            async (
              conversation
            ) => {

              const counselor =
                await CounselorProfile.findOne({

                  userId:
                    conversation.counselorId,

                }).lean();

              return {

  ...conversation,

  patient: {
    userId: conversation.patientId,
  },

  counselor,

  unreadCount: 0,

};

            }
          )

        );

    }

    //-------------------------------------------------
    // COUNSELOR
    //-------------------------------------------------

    else {

      const data =
        await Conversation.find({

          counselorId:
            session.user.id,

        })
          .sort({
            lastMessageAt: -1,
          })
          .lean();

      conversations =
        await Promise.all(

          data.map(
            async (
              conversation
            ) => {

              const patient =
                await PatientProfile.findOne({

                  userId:
                    conversation.patientId,

                }).lean();

              return {

  ...conversation,

  counselor: {
    userId: conversation.counselorId,
  },

  patient,

  unreadCount: 0,

};

            }
          )

        );

    }

    return NextResponse.json({

      success: true,

      conversations,

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