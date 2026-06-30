import Notification from "@/models/Notification";
import { connectDB } from "@/lib/mongodb";

export async function createNotification({
  userId,
  type,
  title,
  message,
  referenceId = null,
}) {
  await connectDB();

  return await Notification.create({
    userId,
    type,
    title,
    message,
    referenceId,
  });
}