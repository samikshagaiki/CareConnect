import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request) {
  try {
    const body = await request.json();

    const { email, password, role } = body;

    // Basic Validation
    if (!email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Connect Database
    await connectDB();

    // Check Existing User
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    // Hash Password
    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    // Create User
    const user = await User.create({
      email,
      passwordHash,
      role,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        userId: user._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}