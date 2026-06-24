import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PatientProfile from "@/models/PatientProfile";
import mongoose from "mongoose";

export async function GET(
  request,
  context
)  {
    
  try {

    const params =
  await context.params;

const patientId =
  params.patientId;
  
    console.log(
      "Patient ID:",
      params.patientId
    );

    await connectDB();

    

const patient =
  await PatientProfile.findOne({
    userId:
      new mongoose.Types.ObjectId(
        patientId
      ),
  }).lean();

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Patient not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      patient,
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