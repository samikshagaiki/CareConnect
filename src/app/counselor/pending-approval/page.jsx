export default function PendingApprovalPage() {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#F8FBFF]
      via-[#EEF8FF]
      to-[#F8F4FF]
      flex
      items-center
      justify-center
      p-6
    "
    >
      <div
        className="
        w-full
        max-w-3xl
        overflow-hidden
        rounded-[36px]
        bg-white
        shadow-2xl
        border
        border-slate-100
      "
      >
        {/* Header */}

        <div
          className="
          bg-gradient-to-r
          from-[#67B7FF]
          to-[#B89CFF]
          px-10
          py-10
          text-white
        "
        >
          <div className="text-6xl mb-4">
            🛡️
          </div>

          <h1 className="text-4xl font-bold">
            Profile Under Review
          </h1>

          <p className="mt-3 text-white/90 text-lg">
            Your counselor application has been
            successfully submitted.
          </p>
        </div>

        {/* Content */}

        <div className="p-10">

          <div
            className="
            rounded-3xl
            bg-sky-50
            border
            border-sky-100
            p-6
          "
          >
            <h2 className="text-xl font-semibold text-slate-800">
              What happens next?
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex gap-4">
                <div
                  className="
                  h-8
                  w-8
                  rounded-full
                  bg-sky-500
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                "
                >
                  1
                </div>

                <div>
                  <p className="font-medium">
                    Profile Verification
                  </p>

                  <p className="text-slate-500">
                    Our admin team reviews your
                    qualifications and profile information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="
                  h-8
                  w-8
                  rounded-full
                  bg-purple-500
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                "
                >
                  2
                </div>

                <div>
                  <p className="font-medium">
                    Approval Process
                  </p>

                  <p className="text-slate-500">
                    Once approved, your counselor account
                    will be activated automatically.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="
                  h-8
                  w-8
                  rounded-full
                  bg-green-500
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                "
                >
                  3
                </div>

                <div>
                  <p className="font-medium">
                    Access Dashboard
                  </p>

                  <p className="text-slate-500">
                    You'll gain full access to patient
                    assignments, appointments and counselor
                    tools.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div
            className="
            mt-8
            rounded-2xl
            border
            border-purple-100
            bg-[#FAF8FF]
            p-5
            text-center
          "
          >
            <p className="font-medium text-slate-700">
              ⏳ Review Time
            </p>

            <p className="mt-2 text-slate-500">
              Most counselor profiles are reviewed within
              24–48 hours.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}