import PatientSidebar from "@/components/patient/PatientSidebar";
import MobileSidebar from "@/components/common/MobileSidebar";

export default function PatientLayout({
  children,
}) {
  return (
    <div
      className="
      min-h-screen
      bg-[#F7FBFF]
      lg:flex
    "
    >
      {/* Desktop Sidebar */}

      <div className="hidden lg:block">
        <PatientSidebar />
      </div>

      {/* Mobile Sidebar */}

      <MobileSidebar>
        <PatientSidebar mobile />
      </MobileSidebar>

      <main
        className="
        flex-1
        min-w-0
        p-4
        md:p-6
        lg:p-8
      "
      >
        {children}
      </main>
    </div>
  );
}