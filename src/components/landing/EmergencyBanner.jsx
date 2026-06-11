export default function EmergencyBanner() {
  return (
    <section className="py-20">
      <div className="max-w-300 mx-auto px-6">

        <div className="bg-linear-to-r from-red-50 to-orange-50 border border-red-100 rounded-3xl p-10">

          <h2 className="text-3xl font-bold">
            Need Immediate Help?
          </h2>

          <p className="mt-4 text-muted-foreground">
            If you&apos;re experiencing a crisis or need urgent emotional support,
            access verified emergency resources and helplines.
          </p>

          <button className="mt-6 px-6 py-3 rounded-2xl bg-red-500 text-white">
            Get Help Now
          </button>

        </div>

      </div>
    </section>
  );
}