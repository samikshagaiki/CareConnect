import CounselorSidebar from "@/components/counselor/CounselorSidebar";

export default function CounselorLayout({
  children,
}) {
  return (
    <div
      className="
      min-h-screen
      flex
      bg-[#F8FAFC]
    "
    >
      <CounselorSidebar />

      <main
  className="
  flex-1
  overflow-y-auto
  bg-[#F8FAFC]
  p-8
"
>
  {children}
</main>
        
    </div>
  );
}