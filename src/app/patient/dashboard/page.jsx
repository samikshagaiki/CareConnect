import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { getTodaysThought } from "@/lib/getTodaysThought";

import PatientProfile from "@/models/PatientProfile";
import CounselorAssignment from "@/models/CounselorAssignment";
import CounselorProfile from "@/models/CounselorProfile";
import Appointment from "@/models/Appointment";
import AssessmentResponse from "@/models/AssessmentResponse";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  await connectDB();

  const profile = await PatientProfile.findOne({
    userId: session.user.id,
  }).lean();

  const todaysThought = await getTodaysThought();

  const completedAssessments = await AssessmentResponse.countDocuments({
    patientId: session.user.id,
  });

  const latestPhq9 = await AssessmentResponse.findOne({
    patientId: session.user.id,
    score: { $gt: 0 },
  })
    .sort({
      submittedAt: -1,
    })
    .lean();

  const assignment = await CounselorAssignment.findOne({
    patientId: session.user.id,
    status: "accepted",
  }).lean();

  let counselor = null;

  if (assignment) {
    counselor = await CounselorProfile.findOne({
      userId: assignment.counselorId,
    }).lean();
  }

  const upcomingAppointment = await Appointment.findOne({
    patientId: session.user.id,
    status: { $in: ["pending", "accepted"] },
    sessionStatus: "upcoming",
    appointmentDate: {
      $gte: new Date(),
    },
  })
    .sort({
      appointmentDate: 1,
    })
    .lean();

  let appointmentCounselor = null;
  if (upcomingAppointment?.counselorId) {
    appointmentCounselor = await CounselorProfile.findOne({
      userId: upcomingAppointment.counselorId,
    }).lean();
  }

  const upcomingAppointmentsCount = await Appointment.countDocuments({
    patientId: session.user.id,
    status: { $in: ["pending", "accepted"] },
    sessionStatus: "upcoming",
    appointmentDate: {
      $gte: new Date(),
    },
  });

  const avatar =
    profile?.gender === "female"
      ? "/female-wellness.png"
      : profile?.gender === "male"
        ? "/male-wellness.png"
        : "/default-wellness.png";

  const cardStyle = `
  rounded-[28px]
  bg-white
  border
  border-white
  shadow-lg
  p-5
  md:p-6
  hover:shadow-xl
  transition-all
`;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* HERO */}

      <section
        className="
    relative
    overflow-hidden
    rounded-4xl
    bg-linear-to-r
    from-[#5aacfe]
    to-[#c1a4fa]
    px-6
    py-8
    md:px-10
    md:py-10
    shadow-xl
    min-h-65
  "
      >
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Welcome Back, {profile?.anonymousName}
            🌸
          </h1>

          <p className="mt-4 text-base md:text-lg text-white/90">
            Continue your wellness journey and celebrate every small step
            forward.
          </p>

          <div
            className="
mt-8
grid
grid-cols-3
gap-6
max-w-lg
"
          >
            <div>
              <h3 className="text-3xl font-bold text-white">
                {completedAssessments}
              </h3>

              <p className="text-white/80">Assessments</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                {latestPhq9?.score ?? 0}
              </h3>

              <p className="text-white/80">PHQ-9 Score</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                {upcomingAppointmentsCount}
              </h3>

              <p className="text-white/80">Appointments</p>
            </div>
          </div>
        </div>

      <div
  className="
    absolute
    right-12
    top-1/2
    hidden
    xl:flex
    -translate-y-1/2
    items-center
    justify-center
  "
>
  <div
    className="
      flex
      h-72
      w-72
      items-center
      justify-center
      rounded-full
      bg-white/15
      backdrop-blur-md
    "
  >
    <Image
      src={avatar}
      alt="Wellness Avatar"
      width={300}
      height={300}
      className="
        h-auto
        w-[260px]
        object-contain
        drop-shadow-2xl
      "
    />
  </div>
</div>
      </section>

      {/* MAIN CARDS */}

      <div
        className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
    gap-6
  "
      >
        <div className={cardStyle}>
          <h3 className="font-semibold text-lg text-purple-500">
            ✨ Today&apos;s Positive Thought
          </h3>

          <p className="mt-4 text-slate-600">{todaysThought}</p>
        </div>

        <div className={cardStyle}>
          <h3 className="font-semibold text-lg text-sky-500">
            😊 Mood Check-In
          </h3>

          <p className="mt-4 text-slate-600">How are you feeling today?</p>

          <div
className="
mt-5
flex
flex-wrap
gap-3
text-2xl
md:text-3xl
"
>😊 😄 😐 😔 😢</div>
        </div>

        <div className={cardStyle}>
          <h3 className="font-semibold text-lg text-purple-500">📖 Journal</h3>

          <p className="mt-4 text-slate-600">
            Capture today&apos;s thoughts and reflections.
          </p>
        </div>

        <div className={cardStyle}>
          <h3 className="font-semibold text-lg text-sky-500">👥 Community</h3>

          <p className="mt-4 text-slate-600">
            Connect with people who understand your journey.
          </p>
        </div>

        <div
          className="
rounded-[28px]
bg-linear-to-br
from-white
to-[#F8F3FF]
border
border-purple-100
shadow-lg
p-5
md:p-6
"
        >
          <h3 className="font-semibold text-lg text-purple-500">
            💜 Assigned Counselor
          </h3>

          {counselor ? (
            <div className="mt-4">
              <h4 className="text-lg md:text-xl font-semibold">
                {counselor.fullName}
              </h4>

              <p className="mt-2 text-slate-500">
                {counselor.experience} Years Experience
              </p>

              <p className="mt-3 text-sm text-slate-500">
                {counselor.specialization?.join(", ")}
              </p>

              <p className="mt-3 text-sm text-slate-500">
                {counselor.languages?.join(", ")}
              </p>

              <Link
                href={`/patient/chat?counselor=${counselor.userId}`}
                className="
mt-6
inline-flex
justify-center
w-full
sm:w-auto
rounded-2xl
bg-purple-500
px-6
py-3
font-medium
text-white
hover:bg-purple-600
transition
  "
              >
                💬 Chat with Counselor
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-slate-500">No counselor assigned yet.</p>
          )}
        </div>

        <div
          className="
rounded-[28px]
bg-linear-to-br
from-white
to-[#EEF8FF]
border
border-sky-100
shadow-lg
p-5
md:p-6
"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-semibold text-sky-600">
              📅 Upcoming Appointment
            </h3>
            {upcomingAppointment && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  upcomingAppointment.status === "accepted"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {upcomingAppointment.status === "accepted" ? "Confirmed" : "Pending Confirmation"}
              </span>
            )}
          </div>

          {upcomingAppointment ? (
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-slate-800 text-lg">
                {new Date(upcomingAppointment.appointmentDate).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}{" "}
                •{" "}
                {new Date(upcomingAppointment.appointmentDate).toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <p className="text-sm font-medium text-slate-600">
                Counselor: {appointmentCounselor?.fullName || counselor?.fullName || "Assigned Counselor"}
              </p>

              {upcomingAppointment.reason && (
                <p className="text-sm text-slate-500 line-clamp-2">
                  &ldquo;{upcomingAppointment.reason}&rdquo;
                </p>
              )}

              <div className="pt-2">
                <Link
                  href="/patient/appointments"
                  className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  Manage Appointments →
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-slate-500">No appointments scheduled.</p>
              <div className="pt-2">
                <Link
                  href="/patient/appointments"
                  className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  Book an Appointment →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STATS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
"
      >
        <div
          className="
rounded-[28px]
bg-linear-to-br
from-white
to-[#EEF8FF]
border
border-sky-100
shadow-lg
p-5
md:p-6
"
        >
          <p className="font-medium">Assessments Completed</p>

          <h3 className="mt-4 text-4xl md:text-5xl font-bold">
            {completedAssessments}
          </h3>
        </div>

        <div
          className="
          rounded-4xl
          bg-linear-to-r
          from-[#B388FF]
          to-[#DCCCFD]
          p-6
          md:p-8
          text-white
          shadow-lg
        "
        >
          <p className="font-medium">Latest PHQ-9 Score</p>

          <h3 className="mt-4 text-4xl md:text-5xl font-bold">
            {latestPhq9?.score ?? 0}
          </h3>

          <p className="mt-2 text-white/90">
            {latestPhq9?.severity ?? "No Data"}
          </p>
        </div>

        <div
          className="
rounded-[28px]
bg-linear-to-br
from-white
to-[#EEF8FF]
border
border-sky-100
shadow-lg
p-5
md:p-6
"
        >
          <p className="font-medium">Upcoming Appointments</p>

          <h3 className="mt-4 text-4xl md:text-5xl font-bold">
            {upcomingAppointmentsCount}
          </h3>
        </div>
      </div>
    </div>
  );
}
