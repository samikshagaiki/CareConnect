import WaveDivider from "./WaveDivider";

export default function EmergencyBanner() {
  return (
    <section className="relative py-24 bg-[#FFFDF8]">

      <div className="max-w-2xl mx-auto px-6 text-center">


          <h2 className="text-4xl font-bold ">
            Need Immediate Help?
          </h2>

          <p className="mt-5 max-w-2xl mx-auto font-medium text-slate-600">
            Access emergency resources,
            helplines and support services.
          </p>

          <button className="mt-8 rounded-2xl bg-purple-100 px-8 py-4 font-semibold shadow">
            Get Help Now
          </button>

        </div>


      <WaveDivider color="#EEF7FF" />
    </section>
  );
}