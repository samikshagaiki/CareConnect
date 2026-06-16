export default function PendingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">

      <div className="max-w-lg rounded-3xl border bg-card p-8 text-center">

        <h1 className="text-3xl font-bold">
          Profile Under Review
        </h1>

        <p className="mt-4 text-muted-foreground">
          Thank you for completing your
          counselor profile.
        </p>

        <p className="mt-2 text-muted-foreground">
          Our admin team is currently
          reviewing your profile.
        </p>

        <p className="mt-6 font-medium">
          You&apos;ll be able to access the
          counselor dashboard once
          your profile is approved.
        </p>

      </div>

    </div>
  );
}