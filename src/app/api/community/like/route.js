import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

import CommunityPost from "@/models/CommunityPost";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    await connectDB();

    const { postId } = await request.json();

    const post = await CommunityPost.findById(postId);

    if (!post) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === session.user.id,
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== session.user.id);
    } else {
      post.likes.push(session.user.id);
    }

    await post.save();

    return NextResponse.json({
      success: true,
      likes: post.likes.length,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
