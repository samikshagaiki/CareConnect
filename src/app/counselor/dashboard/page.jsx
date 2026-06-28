"use client";

import { useEffect, useState } from "react";
import CounselorAnalytics from "@/components/CounselorAnalytics";
import Link from "next/link";


export default function CounselorDashboard() {
  const [requests, setRequests] =
  useState([]);

const [
  upcomingAppointments,
  setUpcomingAppointments,
] = useState([]);

const [loading, setLoading] =
  useState(false);

const [patients, setPatients] =
  useState([]);

  async function fetchRequests() {
    try {
      const response =
        await fetch(
          "/api/counselor/requests"
        );

      const data =
        await response.json();

      if (data.success) {
        setRequests(
          data.requests
        );
      }
    } catch (error) {
      console.error(error);
    }
  }


  async function acceptRequest(
  id
) {
  await fetch(
    `/api/counselor/requests/${id}/accept`,
    {
      method: "PATCH",
    }
  );

  fetchRequests();
}

async function rejectRequest(
  id
) {
  await fetch(
    `/api/counselor/requests/${id}/reject`,
    {
      method: "PATCH",
    }
  );

  fetchRequests();

}

async function fetchPatients() {
  try {
    const response =
      await fetch(
        "/api/counselor/patients"
      );

    const data =
      await response.json();

    if (data.success) {
      setPatients(
        data.patients
      );
    }
  } catch (error) {
    console.error(error);
  }
}


async function fetchUpcomingAppointments() {
  try {
    const response =
      await fetch(
        "/api/counselor/upcoming-appointments"
      );

    const data =
      await response.json();

    if (data.success) {

      const futureAppointments =
        data.appointments.filter(
          (appointment) =>
            new Date(
              appointment.appointmentDate
            ) > new Date()
        );

      setUpcomingAppointments(
        futureAppointments
      );
    }

  } catch (error) {
    console.error(error);
  }
}


  useEffect(() => {
  fetchRequests();
  fetchUpcomingAppointments();
  fetchPatients();
}, []);

return (
 <div className="space-y-8">

    {/* HEADER */}

    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Counselor Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Manage patients, assessments and sessions.
        </p>
      </div>


    </div>

    {/* WELCOME CARD */}

    <div
  className="
  rounded-[32px]
  border
  border-slate-200
  bg-white
  p-10
  shadow-sm
"
>

  <div className="flex items-center justify-between">

    <div>

      <p className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
        Counselor Workspace
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-800">
        Welcome Back
      </h2>

      <p className="mt-4 max-w-3xl text-slate-500">
        Manage patient requests, assign assessments,
        review responses and conduct counseling sessions
        from one central workspace.
      </p>

    </div>

    <div
      className="
      hidden
      lg:flex
      h-50
      w-50
      items-center
      justify-center
      rounded-full
      bg-blue-50
      text-3xl
    "
    >
      🩺
    </div>

  </div>

</div>

    {/* ANALYTICS */}

    <CounselorAnalytics />

    {/* QUICK ACTIONS */}

<section>

<div className="flex items-center justify-between">

<div>

<h2 className="text-2xl font-bold">
Quick Actions
</h2>

<p className="mt-1 text-slate-500">
Frequently used counselor tools.
</p>

</div>

</div>

<div className="mt-6 grid gap-6 md:grid-cols-3">

<Link
href="/counselor/chat"
className="
rounded-[28px]
border
border-blue-100
bg-gradient-to-br
from-blue-50
to-sky-100
p-6
transition
hover:-translate-y-1
hover:shadow-xl
"
>

<div className="text-4xl">
💬
</div>

<h3 className="mt-6 text-xl font-bold">
Patient Inbox
</h3>

<p className="mt-3 text-slate-600">
Continue secure conversations with your patients.
</p>

<div className="mt-6 font-semibold text-blue-600">
Open Inbox →
</div>

</Link>

<Link
href="/counselor/patients"
className="
rounded-[28px]
border
border-green-100
bg-gradient-to-br
from-green-50
to-emerald-50
p-6
transition
hover:-translate-y-1
hover:shadow-xl
"
>

<div className="text-4xl">
👥
</div>

<h3 className="mt-6 text-xl font-bold">
Patients
</h3>

<p className="mt-3 text-slate-600">
Manage assigned patients and monitor progress.
</p>

<div className="mt-6 font-semibold text-green-600">
View Patients →
</div>

</Link>

<Link
href="/counselor/assessments/create"
className="
rounded-[28px]
border
border-purple-100
bg-gradient-to-br
from-purple-50
to-pink-50
p-6
transition
hover:-translate-y-1
hover:shadow-xl
"
>

<div className="text-4xl">
📝
</div>

<h3 className="mt-6 text-xl font-bold">
New Assessment
</h3>

<p className="mt-3 text-slate-600">
Create and assign assessments to patients.
</p>

<div className="mt-6 font-semibold text-purple-600">
Create →
</div>

</Link>

</div>

</section>


    {/* REQUESTS */}

    <section>

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Pending Requests
        </h2>

        <span
          className="
          rounded-full
          bg-amber-100
          px-4
          py-2
          text-sm
          font-medium
          text-amber-700
        "
        >
          {requests.length} Pending
        </span>

      </div>

      {requests.length === 0 ? (

        <div
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-10
          text-center
          shadow-sm
        "
        >
          <h3 className="text-lg font-semibold">
            No Pending Requests
          </h3>

          <p className="mt-2 text-slate-500">
            New patient requests will appear here.
          </p>
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2">

          {requests.map((request) => (

            <div
              key={request._id}
              className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
            "
            >

              <div className="flex justify-between">

                <div>
                  <h3 className="text-xl font-semibold">
                    {request.patient?.anonymousName}
                  </h3>

                  <p className="mt-1 text-slate-500">
                    {request.patient?.age} years •{" "}
                    {request.patient?.gender}
                  </p>
                </div>

                <span
                  className="
                  rounded-full
                  bg-blue-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-blue-700
                "
                >
                  New
                </span>

              </div>

              <p className="mt-4 text-slate-600">
                Preferred Language:{" "}
                {request.patient?.preferredLanguage}
              </p>

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() =>
                    acceptRequest(
                      request._id
                    )
                  }
                  className="
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-2.5
                  text-white
                  hover:bg-blue-700
                "
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    rejectRequest(
                      request._id
                    )
                  }
                  className="
                  rounded-xl
                  border
                  border-slate-300
                  px-5
                  py-2.5
                  hover:bg-slate-50
                "
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>

    {/* APPOINTMENTS */}

    <section>

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Upcoming Sessions
        </h2>

        <span
          className="
          rounded-full
          bg-green-100
          px-4
          py-2
          text-sm
          font-medium
          text-green-700
        "
        >
          {upcomingAppointments.length}
          {" "}
          Scheduled
        </span>

      </div>

      {upcomingAppointments.length === 0 ? (

        <div
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-10
          text-center
          shadow-sm
        "
        >
          <h3 className="text-lg font-semibold">
            No Upcoming Sessions
          </h3>

          <p className="mt-2 text-slate-500">
            Future appointments will appear here.
          </p>
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2">

          {upcomingAppointments.map(
            (appointment) => (

              <div
                key={appointment._id}
                className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
              "
              >

                <div className="flex justify-between">

                  <div>
                    <h3 className="text-xl font-semibold">
                      {
                        appointment.patient
                          ?.anonymousName
                      }
                    </h3>

                    <p className="mt-1 text-slate-500">
                      Counseling Session
                    </p>
                  </div>

                </div>

                <div className="mt-5 space-y-3">

                  <p className="font-medium">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleString()}
                  </p>

                  <p className="text-slate-600">
                    {appointment.reason}
                  </p>

                  <div className="mt-6 flex gap-3">

<Link
href="/counselor/chat"
className="
rounded-xl
bg-blue-600
px-5
py-2.5
text-white
hover:bg-blue-700
"
>

💬 Open Chat

</Link>

<Link
href={`/counselor/patients/${appointment.patient.userId}`}
className="
rounded-xl
border
border-slate-300
px-5
py-2.5
hover:bg-slate-50
"
>

View Patient

</Link>

</div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </section>

  </div>
);
}