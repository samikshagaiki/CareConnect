import CounselorSidebar from "@/components/counselor/CounselorSidebar";
import MobileSidebar from "@/components/common/MobileSidebar";

export default function CounselorLayout({
  children,
}) {
  return (
    <div
      className="
      min-h-screen
      bg-[#F8FAFC]
      lg:flex
    "
    >
      {/* Desktop */}

      <div className="hidden lg:block">
        <CounselorSidebar />
      </div>

      {/* Mobile */}

      <MobileSidebar>
        <CounselorSidebar mobile />
      </MobileSidebar>

      <main
        className="
        flex-1
        min-w-0
        overflow-y-auto
        bg-[#F8FAFC]
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