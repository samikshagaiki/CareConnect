import PatientSidebar from "@/components/patient/PatientSidebar";

export default function PatientLayout({
  children,
}) {
  return (
    <div className="min-h-screen flex bg-[#F7FBFF] relative overflow-hidden">


      <PatientSidebar />

      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}