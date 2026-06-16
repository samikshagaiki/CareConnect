import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getTodaysThought } from "@/lib/getTodaysThought";

import PatientProfile from "@/models/PatientProfile";
import CounselorAssignment from "@/models/CounselorAssignment";
import CounselorProfile from "@/models/CounselorProfile";

export default async function DashboardPage() {
  const session =
    await getServerSession(
      authOptions
    );

  await connectDB();

  const profile =
    await PatientProfile.findOne({
      userId: session.user.id,
    }).lean();

  const todaysThought =
    await getTodaysThought();

  const assignment =
    await CounselorAssignment.findOne({
      patientId:
        session.user.id,

      status: "accepted",
    });

  let counselor = null;

  if (assignment) {
    counselor =
      await CounselorProfile.findOne({
        userId:
          assignment.counselorId,
      }).lean();
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Welcome Back,
        {" "}
        {profile?.anonymousName}
        {" "}
        👋
      </h1>

      <p className="mt-2 text-muted-foreground">
        Here&apos;s an overview of your
        wellness journey.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-semibold">
            Today&apos;s Positive Thought
          </h3>

          <p className="mt-3 text-muted-foreground">
            {todaysThought}
          </p>
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-semibold">
            Mood Check-In
          </h3>

          <p className="mt-3">
            How are you feeling today?
          </p>
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-semibold">
            Journal
          </h3>

          <p className="mt-3">
            Write today&apos;s thoughts.
          </p>
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-semibold">
            Community
          </h3>

          <p className="mt-3">
            Connect with others.
          </p>
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-semibold">
            Assigned Counselor
          </h3>

          {counselor ? (
            <div className="mt-3">
              <p className="font-medium">
                {counselor.fullName}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Experience:
                {" "}
                {counselor.experience}
                {" "}
                years
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Specializations:
                {" "}
                {counselor.specialization?.join(
                  ", "
                )}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Languages:
                {" "}
                {counselor.languages?.join(
                  ", "
                )}
              </p>
            </div>
          ) : (
            <p className="mt-3">
              No counselor assigned yet.
            </p>
          )}
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-semibold">
            Upcoming Appointment
          </h3>

          <p className="mt-3">
            No appointments scheduled.
          </p>
        </div>

      </div>
    </div>
  );
}